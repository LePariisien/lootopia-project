package com.location.locationserv.Services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.location.locationserv.Dtos.TreasureDto;
import com.location.locationserv.Dtos.TreasureWithDetailDto;
import com.location.locationserv.Entities.Clue;
import com.location.locationserv.Entities.Treasure;
import com.location.locationserv.Repositories.ClueRepository;
import com.location.locationserv.Repositories.TreasureRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TreasureService {

    @Autowired
    private TreasureRepository treasureRepository;

    @Autowired
    private ClueRepository clueRepository;

    public ResponseEntity<?> create(TreasureDto treasureDto) {
        if (treasureDto.getLatitude() == 0 || treasureDto.getLongitude() == 0) {
            return ResponseEntity.badRequest().body("Coordonées invalides");
        }

        Treasure treasure = Treasure.builder()
                .id(null)
                .latitude(treasureDto.getLatitude())
                .longitude(treasureDto.getLongitude())
                .address(treasureDto.getAddress())
                .build();

        if (treasureDto.getClueIds() != null) {
            for (UUID clueId : treasureDto.getClueIds()) {
                Clue clue = clueRepository.findById(clueId).orElse(null);
                if (clue != null) {
                    treasure.getClues().add(clue);
                } else {
                    return ResponseEntity.badRequest().body("Indice non trouvé");
                }
            }
        }

        treasureRepository.save(treasure);
        return ResponseEntity.ok(new TreasureDto(treasure));
    }

    public ResponseEntity<?> get(String id) {
        Treasure treasure = treasureRepository.findById(UUID.fromString(id)).orElse(null);
        if (treasure == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(new TreasureDto(treasure));
    }

    public ResponseEntity<?> getWithDetails(String id) {
        Treasure treasure = treasureRepository.findById(UUID.fromString(id)).orElse(null);
        if (treasure == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(new TreasureWithDetailDto(treasure));
    }

    public ResponseEntity<?> update(TreasureDto treasureDto) {
        Treasure existingTreasure = treasureRepository.findById(treasureDto.getId()).orElse(null);
        if (existingTreasure == null) {
            return ResponseEntity.notFound().build();
        }

        existingTreasure.setLatitude(treasureDto.getLatitude());
        existingTreasure.setLongitude(treasureDto.getLongitude());
        existingTreasure.setAddress(treasureDto.getAddress());

        if (treasureDto.getClueIds() != null) {
            for (UUID clueId : treasureDto.getClueIds()) {
                Clue clue = clueRepository.findById(clueId).orElse(null);
                if (clue != null) {
                    existingTreasure.getClues().add(clue);
                } else {
                    return ResponseEntity.badRequest().body("Indice non trouvé");
                }
            }
        }

        treasureRepository.save(existingTreasure);
        return ResponseEntity.ok(new TreasureDto(existingTreasure));
    }

    public ResponseEntity<?> delete(String id) {
        Treasure treasure = treasureRepository.findById(UUID.fromString(id)).orElse(null);
        if (treasure == null) {
            return ResponseEntity.notFound().build();
        }

        treasureRepository.delete(treasure);
        return ResponseEntity.ok("Trésor supprimé avec succès");
    }

    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(treasureRepository.findAll().stream().map(TreasureDto::new).toList());
    }

    public ResponseEntity<?> getAllWithDetails() {
        return ResponseEntity.ok(treasureRepository.findAll().stream().map(TreasureWithDetailDto::new).toList());
    }

    public ResponseEntity<?> getByLocation(double latitude, double longitude) {
        if (latitude == 0 || longitude == 0) {
            return ResponseEntity.badRequest().body("Coordonées invalides");
        }

        return ResponseEntity.ok(treasureRepository.findByLatitudeAndLongitude(latitude, longitude));
    }

    public ResponseEntity<?> getLocationsNearby(double longitude, double latitude, double distance) {
        if (distance == 0 || longitude == 0 || latitude == 0) {
            return ResponseEntity.badRequest().body("Coordonées ou distance invalides");
        }

        List<Treasure> treasures = treasureRepository.findTreasureNerby(longitude, latitude, distance);
        if (treasures.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(treasures.stream().map(TreasureDto::new).toList());
    }

    public ResponseEntity<?> digAHole(String treasureId, double longitude, double latitude, double distance) {
        if (treasureId == null || distance == 0 || longitude == 0 || latitude == 0) {
            return ResponseEntity.badRequest().body("Coordonées ou distance invalides");
        }

        List<Treasure> treasures = treasureRepository.findTreasureNerby(UUID.fromString(treasureId), longitude,
                latitude, distance);
        return ResponseEntity.ok(treasures.stream().map(TreasureDto::new).toList());
    }

}
