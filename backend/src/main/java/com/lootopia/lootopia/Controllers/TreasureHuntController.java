package com.lootopia.lootopia.Controllers;

import com.lootopia.lootopia.Entities.TreasureHunt;
import com.lootopia.lootopia.Entities.User;
import com.lootopia.lootopia.Services.TreasureHuntService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/treasure-hunts")
@RequiredArgsConstructor
public class TreasureHuntController {

    private final TreasureHuntService treasureHuntService;

    @GetMapping
    public ResponseEntity<List<TreasureHunt>> getAllTreasureHunts() {
        List<TreasureHunt> treasureHunts = treasureHuntService.getAllTreasureHunts();
        return ResponseEntity.ok(treasureHunts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TreasureHunt> getTreasureHuntById(@PathVariable Long id) {
        try {
            TreasureHunt treasureHunt = treasureHuntService.getTreasureHuntById(id);
            return ResponseEntity.ok(treasureHunt);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> createTreasureHunt(@RequestBody TreasureHunt treasureHunt) {
        String message = treasureHuntService.createTreasureHunt(treasureHunt);
        return ResponseEntity.ok(message);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateTreasureHunt(@PathVariable Long id, @RequestBody TreasureHunt updatedTreasureHunt) {
        try {
            String message = treasureHuntService.updateTreasureHunt(id, updatedTreasureHunt);
            return ResponseEntity.ok(message);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTreasureHunt(@PathVariable Long id) {
        try {
            String message = treasureHuntService.deleteTreasureHunt(id);
            return ResponseEntity.ok(message);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // @GetMapping("/user/{userId}")
    // public ResponseEntity<List<TreasureHunt>> getTreasureHuntsByUser(@PathVariable Long userId) {
    //     try {
    //         // Simulez un utilisateur pour cet exemple (vous pouvez remplacer cela par une vraie recherche utilisateur)
    //         User user = new User();
    //         user.setId(userId);
    //         List<TreasureHunt> treasureHunts = treasureHuntService.getTreasureHuntsByUser(user);
    //         return ResponseEntity.ok(treasureHunts);
    //     } catch (EntityNotFoundException e) {
    //         return ResponseEntity.notFound().build();
    //     }
    // }
}