package com.lootopia.lootopia.Services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.lootopia.lootopia.Dtos.ClueDto;
import com.lootopia.lootopia.Dtos.DigResultDto;
import com.lootopia.lootopia.Dtos.TreasureDto;
import com.lootopia.lootopia.Dtos.TreasureHuntDto;
import com.lootopia.lootopia.Dtos.TreasureHuntWithTreasureDto;
import com.lootopia.lootopia.Entities.TreasureHunt;
import com.lootopia.lootopia.Repositories.TreasureHuntRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TreasureHuntService {

    @Autowired
    private TreasureHuntRepository treasureHuntRepository;

    @Autowired
    private LocationServClient locationServClient;

    public ResponseEntity<?> create(TreasureHuntWithTreasureDto dto) {
        TreasureDto treasureDto = new TreasureDto(
                null,
                dto.getTreasure().getLatitude(),
                dto.getTreasure().getLongitude(),
                dto.getTreasure().getAddress(),
                null);

        TreasureDto response = locationServClient.createTreasure(treasureDto);
        if (response == null) {
            return ResponseEntity.badRequest().body("Erreur lors de la création du trésor");
        }

        TreasureHunt treasureHunt = new TreasureHunt(
                null,
                dto.getName(),
                dto.getDescription(),
                dto.getLevel(),
                (response != null) ? response.getId() : null,
                dto.getStartDate(),
                dto.getEndDate(),
                dto.getOrganizer_id(),
                dto.isFound(),
                null,
                null);

        treasureHuntRepository.save(treasureHunt);
        return ResponseEntity.ok(new TreasureHuntDto(treasureHunt));
    }

    public ResponseEntity<?> get(Long id) {
        Optional<TreasureHunt> hunt = treasureHuntRepository.findById(id);
        return hunt.map(value -> ResponseEntity.ok(new TreasureHuntDto(value)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    public ResponseEntity<?> getAll() {
        List<TreasureHuntDto> dtos = treasureHuntRepository.findAll().stream().map(TreasureHuntDto::new).toList();
        if (dtos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(dtos);
    }

    public ResponseEntity<?> update(TreasureHuntDto dto) {
        Optional<TreasureHunt> opt = treasureHuntRepository.findById(dto.getId());
        if (opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        TreasureHunt hunt = opt.get();
        hunt.setName(dto.getName());
        hunt.setDescription(dto.getDescription());
        hunt.setLevel(dto.getLevel());
        hunt.setStartDate(dto.getStartDate());
        hunt.setEndDate(dto.getEndDate());
        hunt.setFound(dto.isFound());
        treasureHuntRepository.save(hunt);

        return ResponseEntity.ok(new TreasureHuntDto(hunt));
    }

    public ResponseEntity<?> delete(Long id) {
        if (!treasureHuntRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        treasureHuntRepository.deleteById(id);

        return ResponseEntity.ok("Chasse au trésor supprimée !");
    }

    public ResponseEntity<?> digAHole(String treasureId, double latitude, double longitude, double distance) {
        try {
            List<ClueDto> clueResponse = locationServClient.digAClue(UUID.fromString(treasureId), latitude, longitude,
                    distance);
            List<TreasureDto> treasureResponse = locationServClient.digATreasure(UUID.fromString(treasureId), latitude,
                    longitude, distance);

            boolean hasClues = clueResponse != null && !clueResponse.isEmpty();
            boolean hasTreasures = treasureResponse != null && !treasureResponse.isEmpty();

            if (hasClues || hasTreasures) {
                return ResponseEntity.ok(new DigResultDto(clueResponse, treasureResponse));
            } else {
                return ResponseEntity.ok(new DigResultDto(List.of(), List.of()));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur lors de la fouille : " + e.getMessage());
        }
    }

    	public ResponseEntity<?> getTreasureHuntCount() {
		long count = treasureHuntRepository.count();
		return ResponseEntity.ok(count);
	}

}
