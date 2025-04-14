package com.lootopia.lootopia.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lootopia.lootopia.Services.MailService;

@RestController
public class MailController {

    @Autowired
    private MailService mailService;

    @GetMapping("/verify")
    public ResponseEntity<String> verifyMailUser(@Param("code") String code) {
        return mailService.mailVerify(code);
    }

}