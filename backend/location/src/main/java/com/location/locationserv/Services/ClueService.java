package com.location.locationserv.Services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.location.locationserv.Dtos.ClueDto;
import com.location.locationserv.Dtos.TreasureDto;
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
            return ResponseEntity.badRequest().body("Coordonnées invalides");
        }
        if (clueDto.getMessage() == null || clueDto.getMessage().isEmpty()) {
            return ResponseEntity.badRequest().body("Contenu de l'indice manquant");
        }
        if (clueDto.getStep() <= 0) {
            return ResponseEntity.badRequest().body("Le nombre d'étapes ne peut pas être nul ou négatif");
        }

        TreasureDto treasureDto = new TreasureDto(treasureRepository.findById(clueDto.getTreasureId()).orElse(null));
        Treasure treasure = Treasure.builder()
                .id(treasureDto.getId())
                .latitude(treasureDto.getLatitude())
                .longitude(treasureDto.getLongitude())
                .address(treasureDto.getAddress())
                .clues(null)
                .build();

        Clue clue = Clue.builder()
                .id(null)
                .latitude(clueDto.getLatitude())
                .longitude(clueDto.getLongitude())
                .address(clueDto.getAddress())
                .message(clueDto.getMessage())
                .step(clueDto.getStep())
                .treasure(treasure)
                .build();

        clueRepository.save(clue);
        return ResponseEntity.ok("Indice créé avec succès");
    }

    public ResponseEntity<?> create(List<ClueDto> ClueDtos) {
        if (ClueDtos == null || ClueDtos.isEmpty()) {
            return ResponseEntity.badRequest().body("Liste d'indices vide");
        }

        for (ClueDto clueDto : ClueDtos) {
            ResponseEntity<?> response = create(clueDto);
            if (response.getStatusCode().isError()) {
                return response;
            }
        }

        return ResponseEntity.ok("Indices créés avec succès");
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
        if (clueDto.getStep() <= 0) {
            return ResponseEntity.badRequest().body("Le nombre d'étapes ne peut pas être nul ou négatif");
        }

        existingClue.setLatitude(clueDto.getLatitude());
        existingClue.setLongitude(clueDto.getLongitude());
        existingClue.setAddress(clueDto.getAddress());
        existingClue.setMessage(clueDto.getMessage());
        existingClue.setStep(clueDto.getStep());

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
        Clue clues = clueRepository.findByLatitudeAndLongitude(latitude, longitude);
        if (clues == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(clues);
    }

    public ResponseEntity<?> digAHole(String treasureId, double longitude, double latitude, double distance) {
        if (treasureId == null || distance == 0 || longitude == 0 || latitude == 0) {
            return ResponseEntity.badRequest().body("Coordonées ou distance invalides");
        }

        List<Clue> clues = clueRepository.findClueNerby(UUID.fromString(treasureId), longitude, latitude, distance);
        if (clues.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(clues.stream().map(ClueDto::new).toList());
    }

    public ResponseEntity<?> getByStep(String treasureId, int step) {
        if (step <= 0) {
            return ResponseEntity.badRequest().body("Le nombre d'étapes ne peut pas être nul ou négatif");
        }

        Clue clue = clueRepository.findByTreasureIdAndStep(UUID.fromString(treasureId), step);
        if (clue == null || clue.getStep() != step) {
            return ResponseEntity.badRequest().body("Aucun indice trouvé pour cette étape");
        }
        return ResponseEntity.ok(new ClueDto(clue));
    }

}
