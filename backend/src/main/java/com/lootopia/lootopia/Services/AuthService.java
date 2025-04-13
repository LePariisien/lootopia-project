package com.lootopia.lootopia.Services;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import com.lootopia.lootopia.Exceptions.CustomException;
import com.lootopia.lootopia.Repositories.UserRepository;

import jakarta.mail.MessagingException;
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

    @Autowired
    private MailService mailService;

    public ResponseEntity<?> signup(@RequestBody RegisterDto registerDto, String siteURL)
            throws UnsupportedEncodingException, MessagingException {
        if (userRepository.existsByUsername(registerDto.getUsername())
                || userRepository.existsByEmail(registerDto.getEmail())) {
            throw new CustomException("Ce nom d'utilisateur ou ce mail est déjà pris", HttpStatus.CONFLICT);
        }

        var user = User.builder()
                .username(registerDto.getUsername())
                .email(registerDto.getEmail())
                .password(passwordEncoder.encode(registerDto.getPassword()))
                .build();

        if (user.getCreatedAt() == null) {
            user.setCreatedAt(LocalDateTime.now());
        }
        user.setUpdatedAt(LocalDateTime.now());
        user.setVerificationCode(RandomStringUtils.randomAlphanumeric(64));
        user.setEmailVerified(false);
        user.setMfaEnabled(registerDto.isMfaEnabled());

        mailService.sendVerificationEmailRegister(user, siteURL);

        if (registerDto.isMfaEnabled()) {
            String secret = gaService.generateKey();
            user.setMfaSecret(secret);

            userRepository.save(user);

            String qrCodeUrl = gaService.generateQRUrl(secret, registerDto.getUsername());
            Map<String, String> response = new HashMap<>();
            response.put("secret", secret);
            response.put("qrCodeUrl", "data:image/png;base64," + qrCodeUrl);

            return ResponseEntity.ok(response);
        } else {
            user.setMfaSecret(null);

            userRepository.save(user);

            return ResponseEntity.ok(GetJwtAuthResponse(user));
        }
    }

    public ResponseEntity<?> signin(LoginDto loginDto) {
        var user = userRepository.findByEmail(loginDto.getEmail()).get();
        if (user == null) {
            throw new CustomException("Email ou mot de passe incorrect", HttpStatus.UNAUTHORIZED);
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), loginDto.getPassword()));
        } catch (BadCredentialsException ex) {
            throw new CustomException("Email ou mot de passe incorrect", HttpStatus.UNAUTHORIZED);
        }

        if (user.isMfaEnabled()) {
            if (loginDto.getMfaCode() == null || !gaService.isValid(user.getMfaSecret(), loginDto.getMfaCode())) {
                throw new CustomException("Code MFA invalide", HttpStatus.UNAUTHORIZED);
            }
        }

        return ResponseEntity.ok(GetJwtAuthResponse(user));
    }

    public ResponseEntity<?> verifyMfaCode(String username, String mfaCode) {
        var user = userRepository.findByUsername(username).get();
        if (user == null) {
            throw new CustomException("Email ou mot de passe incorrect", HttpStatus.UNAUTHORIZED);
        }

        if (!gaService.isValid(user.getMfaSecret(), mfaCode)) {
            throw new CustomException("Code MFA invalide", HttpStatus.UNAUTHORIZED);
        }

        return ResponseEntity.ok(GetJwtAuthResponse(user));
    }

    private JwtAuthResponse GetJwtAuthResponse(User user) {
        user.setLastSigninAt(LocalDateTime.now());

        return JwtAuthResponse.builder()
                .accessToken(jwtService.generateAccessToken(user))
                .refreshToken(jwtService.generateRefreshToken(user))
                .build();
    }

}