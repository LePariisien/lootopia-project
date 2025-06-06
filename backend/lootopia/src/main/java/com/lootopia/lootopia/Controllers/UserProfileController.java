package com.lootopia.lootopia.Controllers;

import com.lootopia.lootopia.Dtos.UserProfileDto;
import com.lootopia.lootopia.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users") 
public class UserProfileController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}/profile")
    public ResponseEntity<UserProfileDto> getUserProfile(@PathVariable String id) {
        UserProfileDto profile = userService.getProfile(id);
        if (profile == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(profile);
    }
}
