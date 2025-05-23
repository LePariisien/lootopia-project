package com.location.locationserv.Services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.location.locationserv.Dtos.ClueDto;
import com.location.locationserv.Entities.Clue;
import com.location.locationserv.Entities.Treasure;
import com.location.locationserv.Repositories.ClueRepository;
import com.location.locationserv.Repositories.TreasureRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClueService {

    @Autowired
    private ClueRepository clueRepository;

    @Autowired
    private TreasureRepository treasureRepository;

    public ResponseEntity<?> create(ClueDto clueDto) {
        if (clueDto.getLatitude() == 0 || clueDto.getLongitude() == 0) {
            return ResponseEntity.badRequest().body("Invalid coordinates");
        }
        if (clueDto.getMessage() == null || clueDto.getMessage().isEmpty()) {
            return ResponseEntity.badRequest().body("Hint text cannot be empty");
        }

        Clue clue = Clue.builder()
                .latitude(clueDto.getLatitude())
                .longitude(clueDto.getLongitude())
                .message(clueDto.getMessage())
                .build();

        Treasure treasure = treasureRepository.findById(clueDto.getTreasureId()).orElse(null);
        if (treasure != null) {
            clue.setTreasure(treasure);
        } else {
            return ResponseEntity.badRequest().body("Trésor non trouvé");
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

    public ResponseEntity<?> update(ClueDto clueDto) {
        Clue existingClue = clueRepository.findById(clueDto.getId()).orElse(null);
        if (existingClue == null) {
            return ResponseEntity.notFound().build();
        }

        existingClue.setMessage(clueDto.getMessage());
        existingClue.setLatitude(clueDto.getLatitude());
        existingClue.setLongitude(clueDto.getLongitude());

        Treasure treasure = treasureRepository.findById(clueDto.getTreasureId()).orElse(null);
        if (treasure != null) {
            existingClue.setTreasure(treasure);
        } else {
            return ResponseEntity.badRequest().body("Trésor non trouvé");
        }

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

    public ResponseEntity<?> getByTreasureId(String treasureId) {
        List<Clue> clues = clueRepository.findByTreasureId(UUID.fromString(treasureId));
        if (clues.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(clues);
    }

    public ResponseEntity<?> getByLocation(double latitude, double longitude) {
        if (latitude == 0 || longitude == 0) {
            return ResponseEntity.badRequest().body("Coordonées invalides");
        }
        List<Clue> clues = clueRepository.findByLatitudeAndLongitude(latitude, longitude);
        if (clues.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(clues);
    }

}
