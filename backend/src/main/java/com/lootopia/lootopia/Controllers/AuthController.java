package com.lootopia.lootopia.Controllers;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lootopia.lootopia.Dtos.LoginDto;
import com.lootopia.lootopia.Dtos.RegisterDto;
import com.lootopia.lootopia.Services.AuthService;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signup(@RequestBody RegisterDto registerDto, HttpServletRequest request)
            throws UnsupportedEncodingException, MessagingException {
        return authService.signup(registerDto, getSiteURL(request));
    }

    @PostMapping("/login")
    public ResponseEntity<?> signin(@RequestBody LoginDto loginDto) {
        return authService.signin(loginDto);
    }

    @PostMapping("/verify-mfa")
    public ResponseEntity<?> verifyMfa(@RequestParam String username, @RequestParam String mfaCode) {
        return authService.verifyMfaCode(username, mfaCode);
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }

}