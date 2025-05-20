package com.location.location_service.Services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.location.location_service.Entities.Clue;
import com.location.location_service.Repositories.ClueRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClueService {

    @Autowired
    private ClueRepository clueRepository;

    public ResponseEntity<?> create(Clue clue) {
        if (clue.getLatitude() == 0 || clue.getLongitude() == 0) {
            return ResponseEntity.badRequest().body("Invalid coordinates");
        }
        if (clue.getHintText() == null || clue.getHintText().isEmpty()) {
            return ResponseEntity.badRequest().body("Hint text cannot be empty");
        }
        clueRepository.save(clue);
        return ResponseEntity.ok("Indice créé avec succès");
    }

    public ResponseEntity<?> get(String id) {
        Clue clue = clueRepository.findById(UUID.fromString(id)).orElse(null);
        if (clue == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(clue);
    }

    public ResponseEntity<?> update(Clue clue) {
        Clue existingClue = clueRepository.findById(clue.getId()).orElse(null);
        if (existingClue == null) {
            return ResponseEntity.notFound().build();
        }

        existingClue.setHintText(clue.getHintText());
        existingClue.setLatitude(clue.getLatitude());
        existingClue.setLongitude(clue.getLongitude());

        clueRepository.save(existingClue);
        return ResponseEntity.ok("Indice modifié avec succès");
    }

    public ResponseEntity<?> delete(String id) {
        Clue clue = clueRepository.findById(UUID.fromString(id)).orElse(null);
        if (clue == null) {
            return ResponseEntity.notFound().build();
        }

        clueRepository.delete(clue);
        return ResponseEntity.ok("Indice supprimé avec succès");
    }

    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(clueRepository.findAll());
    }

    public String getByTreasureId(String treasureId) {
        // Logic to get clues by treasure ID
        return "List of clues for Treasure ID: " + treasureId;
    }

    public String getByLocation(double latitude, double longitude) {
        // Logic to get clues by location
        return "List of clues for location: (" + latitude + ", " + longitude + ")";
    }

}
