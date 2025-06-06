package com.lootopia.lootopia.Controllers;

import com.lootopia.lootopia.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserProfileController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}/profile")
    public ResponseEntity<?> getUserFullProfile(@PathVariable String id) {
        Map<String, Object> profileData = userService.getFullProfile(id);
        if (profileData == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(profileData);
    }
}
