package com.lootopia.lootopia.Services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.lootopia.lootopia.Dtos.ArtefactDto;
import com.lootopia.lootopia.Entities.Artefact;
import com.lootopia.lootopia.Repositories.ArtefactRepository;

@Service
public class ArtefactService {

        @Autowired
        private ArtefactRepository artefactRepository;

        public ResponseEntity<?> getArtefactById(String id) {
                Artefact artefact = artefactRepository.findById(UUID.fromString(id))
                                .orElseThrow(() -> new RuntimeException("Artefact not found with id: " + id));
                return ResponseEntity.ok(new ArtefactDto(artefact));
        }

        public ResponseEntity<?> createArtefact(ArtefactDto artefactDto) {
                Artefact artefact = Artefact.builder()
                                .name(artefactDto.getName())
                                .description(artefactDto.getDescription())
                                .price(artefactDto.getPrice())
                                .rarity(artefactDto.getRarity())
                                .rarityColor(artefactDto.getRarityColor())
                                .effect(artefactDto.getEffect())
                                .image(artefactDto.getImage())
                                .build();

                Artefact savedArtefact = artefactRepository.save(artefact);
                return ResponseEntity.ok(new ArtefactDto(savedArtefact));
        }

        public ResponseEntity<?> getAllArtefacts() {
                List<Artefact> artefacts = artefactRepository.findAll();
                return ResponseEntity.ok(artefacts);
        }

        public ResponseEntity<?> updateArtefact(ArtefactDto artefactDto) {
                Artefact artefact = artefactRepository.findById(artefactDto.getId())
                                .orElseThrow(() -> new RuntimeException(
                                                "Artefact not found with id: " + artefactDto.getId()));

                artefact.setName(artefactDto.getName());
                artefact.setDescription(artefactDto.getDescription());
                artefact.setPrice(artefactDto.getPrice());
                artefact.setRarity(artefactDto.getRarity());
                artefact.setRarityColor(artefactDto.getRarityColor());
                artefact.setEffect(artefactDto.getEffect());
                artefact.setImage(artefactDto.getImage());

                Artefact updatedArtefact = artefactRepository.save(artefact);
                return ResponseEntity.ok(new ArtefactDto(updatedArtefact));
        }

        public ResponseEntity<?> deleteArtefact(String id) {
                Artefact artefact = artefactRepository.findById(UUID.fromString(id))
                                .orElseThrow(() -> new RuntimeException("Artefact not found with id: " + id));
                artefactRepository.delete(artefact);
                return ResponseEntity.ok("Artefact deleted successfully");
        }

        public Map<String, List<Artefact>> getAllArtefactsGrouped() {
                List<Artefact> all = artefactRepository.findAll();

                Map<String, List<Artefact>> result = new HashMap<>();
                result.put("commonArtefacts", all.stream()
                                .filter(a -> "Commun".equalsIgnoreCase(a.getRarity()))
                                .collect(Collectors.toList()));
                result.put("rareArtefacts", all.stream()
                                .filter(a -> "Rare".equalsIgnoreCase(a.getRarity()))
                                .collect(Collectors.toList()));
                result.put("epicArtefacts", all.stream()
                                .filter(a -> "Épique".equalsIgnoreCase(a.getRarity()))
                                .collect(Collectors.toList()));
                result.put("legendaryArtefacts", all.stream()
                                .filter(a -> "Légendaire".equalsIgnoreCase(a.getRarity()))
                                .collect(Collectors.toList()));

                return result;
        }
}
