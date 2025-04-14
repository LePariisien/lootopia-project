package com.lootopia.lootopia.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lootopia.lootopia.Services.TokenService;

@RestController
@RequestMapping("/api/token")
public class TokenController extends AbstractController {

    @Autowired
    private TokenService tokenService;

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestHeader("Authorization") String refreshToken) {
        System.out.println("Authorization Header: " + refreshToken);
        return tokenService.refreshToken(refreshToken);
    }

    @PostMapping("/revoke-token")
    public ResponseEntity<String> revokeToken(@RequestHeader("Authorization") String token) {
        tokenService.revokeToken(token);
        return ResponseEntity.ok("Token révoqué avec succès");
    }

}