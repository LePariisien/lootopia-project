package com.lootopia.lootopia.Services;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import com.lootopia.lootopia.Dtos.JwtAuthResponse;
import com.lootopia.lootopia.Dtos.LoginDto;
import com.lootopia.lootopia.Dtos.RegisterDto;
import com.lootopia.lootopia.Entities.User;
import com.lootopia.lootopia.Repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private GAService gaService;

    public ResponseEntity<?> signup(@RequestBody RegisterDto request) {
        if (userRepository.existsByUsername(request.getUsername())
                || userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Ce nom d'utilisateur ou ce mail est déjà pris");
        }

        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        if (user.getCreatedAt() == null) {
            user.setCreatedAt(LocalDateTime.now());
        }
        user.setUpdatedAt(LocalDateTime.now());

        user.setMfaEnabled(request.isMfaEnabled());

        if (request.isMfaEnabled()) {
            String secret = gaService.generateKey();
            user.setMfaSecret(secret);

            String qrCodeUrl = gaService.generateQRUrl(secret, request.getUsername());

            userRepository.save(user);

            Map<String, String> response = new HashMap<>();
            response.put("secret", secret);
            response.put("qrCodeUrl", "data:image/png;base64," + qrCodeUrl);
            return ResponseEntity.ok(response);
        } else {
            user.setMfaSecret(null);

            userRepository.save(user);

            String accessToken = jwtService.generateAccessToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);

            JwtAuthResponse jwtAuthResponse = JwtAuthResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();

            return ResponseEntity.ok(jwtAuthResponse);
        }
    }

    public ResponseEntity<JwtAuthResponse> signin(LoginDto request) {
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email ou mot de passe incorrect"));

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), request.getPassword()));
        } catch (BadCredentialsException ex) {
            throw new IllegalArgumentException("Email ou mot de passe incorrect");
        }

        if (user.isMfaEnabled()) {
            if (request.getMfaCode() == null || !gaService.isValid(user.getMfaSecret(), request.getMfaCode())) {
                throw new IllegalArgumentException("Code MFA invalide");
            }
        }

        return ResponseEntity.ok(GetJwtAuthResponse(user));
    }

    public ResponseEntity<JwtAuthResponse> verifyMfaCode(String username, String mfaCode) {
        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur introuvable"));

        if (!gaService.isValid(user.getMfaSecret(), mfaCode)) {
            throw new IllegalArgumentException("Code MFA invalide");
        }

        return ResponseEntity.ok(GetJwtAuthResponse(user));
    }

    private JwtAuthResponse GetJwtAuthResponse(User user) {
        return JwtAuthResponse.builder()
                .accessToken(jwtService.generateAccessToken(user))
                .refreshToken(jwtService.generateRefreshToken(user))
                .build();
    }

}