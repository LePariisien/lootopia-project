package com.lootopia.lootopia.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lootopia.lootopia.Dtos.JwtAuthResponse;
import com.lootopia.lootopia.Dtos.LoginDto;
import com.lootopia.lootopia.Dtos.RegisterDto;
import com.lootopia.lootopia.Services.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signup(@RequestBody RegisterDto request) {
        return authService.signup(request);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> signin(@RequestBody LoginDto request) {
        return authService.signin(request);
    }

    @PostMapping("/verify-mfa")
    public ResponseEntity<JwtAuthResponse> verifyMfa(@RequestParam String username, @RequestParam String mfaCode) {
        return authService.verifyMfaCode(username, mfaCode);
    }

}