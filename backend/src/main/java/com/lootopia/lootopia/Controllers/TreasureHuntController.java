package com.lootopia.lootopia.Controllers;

import com.lootopia.lootopia.Dtos.TreasureHuntDto;
import com.lootopia.lootopia.Entities.Participation;
import com.lootopia.lootopia.Entities.TreasureHunt;
import com.lootopia.lootopia.Services.TreasureHuntService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/treasure-hunts")
@RequiredArgsConstructor
public class TreasureHuntController {

    @Autowired
    private TreasureHuntService treasureHuntService;

    @GetMapping
    public ResponseEntity<?> getAllTreasureHunts() {
        return treasureHuntService.getAllTreasureHunts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTreasureHuntById(@PathVariable Long id) {
        return treasureHuntService.getTreasureHuntById(id);
    }

    @PostMapping
    public ResponseEntity<?> createTreasureHunt(@RequestBody @Valid TreasureHuntDto treasureHuntDto) {
        return treasureHuntService.createTreasureHunt(treasureHuntDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTreasureHunt(@RequestBody TreasureHuntDto updatedTreasureHunt) {
        return treasureHuntService.updateTreasureHunt(updatedTreasureHunt);
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

    @GetMapping("/{id}/participations")
    public ResponseEntity<List<Participation>> getParticipations(@PathVariable Long id) {
        List<Participation> participations = treasureHuntService.getParticipationsForTreasureHunt(id);
        return ResponseEntity.ok(participations);
    }

    // @PostMapping("/participations/{id}/accept")
    // public ResponseEntity<String> acceptParticipation(@PathVariable Long id) {
    //     String message = treasureHuntService.acceptParticipation(id);
    //     return ResponseEntity.ok(message);
    // }

    // @PostMapping("/participations/{id}/reject")
    // public ResponseEntity<String> rejectParticipation(@PathVariable Long id) {
    //     String message = treasureHuntService.rejectParticipation(id);
    //     return ResponseEntity.ok(message);
    // }
}