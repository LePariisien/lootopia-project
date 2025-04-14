package com.lootopia.lootopia.Services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.lootopia.lootopia.Entities.User;
import com.lootopia.lootopia.Repositories.RevokedTokenRepository;

import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class JwtService {

    @Value("${jwt-secret}")
    private String jwtSecret;

    private SecretKey key;

    @Autowired
    private RevokedTokenRepository revokedTokenRepository;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("account_creation_timestamp", user.getCreatedAt().toString());
        claims.put("user_id", user.getId());
        claims.put("username", user.getUsername());
        claims.put("email", user.getEmail());
        return createToken(claims, user.getUsername(), TimeUnit.HOURS.toMillis(1));
    }

    public String generateRefreshToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, user.getUsername(), TimeUnit.DAYS.toMillis(15));
    }

    private String createToken(Map<String, Object> claims, String subject, Long expiration) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token, String username) {
        if (revokedTokenRepository.existsByToken(token)) {
            return false;
        }

        String extractedUsername = extractUsername(token);
        if (extractedUsername.equals(username) && !isTokenExpired(token)) {
            try {
                Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
                return true;
            } catch (JwtException | IllegalArgumentException e) {
                return false;
            }
        }
        return false;
    }

    public boolean isTokenExpiredSoon(String token) {
        Date expirationDate = extractExpiration(token);
        long timeLeft = expirationDate.getTime() - System.currentTimeMillis();
        return timeLeft < TimeUnit.MINUTES.toMillis(5);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getExpiration();
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }

}