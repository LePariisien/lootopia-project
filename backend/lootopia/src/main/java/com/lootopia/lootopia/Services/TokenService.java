package com.lootopia.lootopia.Services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.lootopia.lootopia.Dtos.JwtAuthResponse;
import com.lootopia.lootopia.Entities.RevokedTokens;
import com.lootopia.lootopia.Exceptions.CustomException;
import com.lootopia.lootopia.Repositories.RevokedTokenRepository;
import com.lootopia.lootopia.Repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TokenService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private RevokedTokenRepository revokedTokenRepository;

    public ResponseEntity<?> refreshToken(String refreshToken) {
        var refreshTokenClean = getTokenClean(refreshToken);
        String username = jwtService.extractUsername(refreshTokenClean);
        var user = userRepository.findByUsername(username).get();
        if (user == null) {
            throw new CustomException("Utilisateur introuvable", HttpStatus.NOT_FOUND);
        }

        if (!jwtService.validateToken(refreshTokenClean, username)) {
            throw new CustomException("Token de rafraîchissement invalide ou expiré", HttpStatus.BAD_REQUEST);
        }

        String newAccessToken = null;
        if (jwtService.isTokenExpiredSoon(refreshTokenClean)) {
            revokeToken(refreshTokenClean);
            newAccessToken = jwtService.generateAccessToken(user);
        } else {
            newAccessToken = refreshTokenClean;
        }

        JwtAuthResponse jwtAuthResponse = JwtAuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(refreshTokenClean)
                .build();

        return ResponseEntity.ok(jwtAuthResponse);
    }

    public void revokeToken(String token) {
        var tokenClean = getTokenClean(token);

        if (!revokedTokenRepository.existsByToken(tokenClean)) {
            RevokedTokens revokedToken = new RevokedTokens();
            revokedToken.setToken(tokenClean);
            revokedToken.setRevokedAt(LocalDateTime.now());
            revokedTokenRepository.save(revokedToken);
        }
    }

    public String getTokenClean(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        return token;
    }

}