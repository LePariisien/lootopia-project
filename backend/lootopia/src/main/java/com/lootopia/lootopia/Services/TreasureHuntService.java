package com.lootopia.lootopia.Services;

import java.util.List;
import java.util.Optional;

import com.lootopia.lootopia.Dtos.TreasureHuntDto;
import com.lootopia.lootopia.Entities.TreasureHunt;
import com.lootopia.lootopia.Repositories.TreasureHuntRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TreasureHuntService {

    private final TreasureHuntRepository treasureHuntRepository;

    public ResponseEntity<?> create(TreasureHuntDto dto) {
        TreasureHunt treasureHunt = new TreasureHunt(
                null,
                dto.getName(),
                dto.getDescription(),
                dto.getLevel(),
                dto.getTreasure_id(),
                dto.getStartDate(),
                dto.getEndDate(),
                dto.getOrganizer_id(),
                dto.isFound(),
                null,
                null);

        treasureHuntRepository.save(treasureHunt);
        return ResponseEntity.ok("Chasse au trésor créée !");
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

        return ResponseEntity.ok("Chasse au trésor modifiée !");
    }

    public ResponseEntity<?> delete(Long id) {
        if (!treasureHuntRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        treasureHuntRepository.deleteById(id);

        return ResponseEntity.ok("Chasse au trésor supprimée !");
    }

}
