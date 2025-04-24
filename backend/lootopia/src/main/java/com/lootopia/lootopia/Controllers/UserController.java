package com.lootopia.lootopia.Controllers;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lootopia.lootopia.Services.AuthService;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/user")
public class UserController extends AbstractController {

    @Autowired
    private AuthService authService;

    @GetMapping("/resend-email")
    public ResponseEntity<?> resendEmail(HttpServletRequest request)
            throws UnsupportedEncodingException, MessagingException {
        return authService.resendVerification(getSiteURL(request));
    }

    @GetMapping("/mfa-qr")
    public ResponseEntity<?> mfaQr() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return authService.getMfaQr(username);
    }

    @PostMapping("/mfa")
    public ResponseEntity<?> mfa(@RequestParam boolean enable) {
        return authService.mfa(enable);
    }

}
