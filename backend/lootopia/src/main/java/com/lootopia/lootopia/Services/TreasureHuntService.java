package com.lootopia.lootopia.Services;

import com.lootopia.lootopia.Dtos.TreasureHuntDto;
import com.lootopia.lootopia.Entities.Participation;
import com.lootopia.lootopia.Entities.Player;
import com.lootopia.lootopia.Entities.TreasureHunt;
import com.lootopia.lootopia.Exceptions.CustomException;
import com.lootopia.lootopia.Repositories.ParticipationRepository;
import com.lootopia.lootopia.Repositories.TreasureHuntRepository;
import com.lootopia.lootopia.Repositories.PlayerRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TreasureHuntService {
    
    @Autowired
    private final TreasureHuntRepository treasureHuntRepository;

    @Autowired
    private final ParticipationRepository participationRepository;
    
    @Autowired
    private PlayerRepository playerRepository;

    public ResponseEntity<?> getAllTreasureHunts() {
        List<TreasureHunt> AllTreasureHunt = treasureHuntRepository.findAll();
        if (AllTreasureHunt.isEmpty()) {
            throw new CustomException("Erreur : Aucune chasse au trésor trouvée.", HttpStatus.NOT_FOUND);
        }
        List<TreasureHuntDto> result = new ArrayList<>();
        for (TreasureHunt treasureHunt : AllTreasureHunt) {
            result.add(new TreasureHuntDto(treasureHunt));   
        }
        return ResponseEntity.ok(result);

    }

    public ResponseEntity<?> getTreasureHuntById(Long id) {
        TreasureHunt result = treasureHuntRepository.findById(id)
            .orElseThrow(() -> new CustomException("Erreur : La chasse au trésor n'existe pas.", HttpStatus.NOT_FOUND));

        return ResponseEntity.ok(new TreasureHuntDto(result));
    }

    public ResponseEntity<?> createTreasureHunt(TreasureHuntDto treasureHuntDto) {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();

            Player player = playerRepository.findByUserUsername(username)
                    .orElseThrow(() -> new CustomException("Joueur introuvable", HttpStatus.NOT_FOUND));

            TreasureHunt hunt = TreasureHunt.builder()
                    .name(treasureHuntDto.getName())
                    .description(treasureHuntDto.getDescription())
                    .level(treasureHuntDto.getLevel())
                    .location(treasureHuntDto.getLocation())
                    .startDate(treasureHuntDto.getStartDate())
                    .endDate(treasureHuntDto.getEndDate())
                    .creator(player)
                    .createdAt(new java.util.Date())
                    .build();
            treasureHuntRepository.save(hunt);

            return ResponseEntity.ok("Succès : La chasse au trésor '" + treasureHuntDto.getName() + "' a été créée avec succès.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la création de la chasse au trésor.");
        }
    }

    public ResponseEntity<?> updateTreasureHunt(TreasureHuntDto updatedTreasureHunt) {
        var existingTreasureHunt = treasureHuntRepository.findById(updatedTreasureHunt.getId())
                .orElseThrow(() -> new CustomException("chasse introuvable", HttpStatus.NOT_FOUND));

        existingTreasureHunt.setName(updatedTreasureHunt.getName());
        existingTreasureHunt.setDescription(updatedTreasureHunt.getDescription());
        existingTreasureHunt.setLevel(updatedTreasureHunt.getLevel());
        existingTreasureHunt.setLocation(updatedTreasureHunt.getLocation());
        existingTreasureHunt.setStartDate(updatedTreasureHunt.getStartDate());
        existingTreasureHunt.setEndDate(updatedTreasureHunt.getEndDate());

        treasureHuntRepository.save(existingTreasureHunt);
        return ResponseEntity.ok("Succès : La chasse au trésor " + updatedTreasureHunt.getName() + " a été mise à jour avec succès.");
    };

    public String deleteTreasureHunt(Long id) {
        if (!treasureHuntRepository.existsById(id)) {
            throw new EntityNotFoundException("Erreur : La chasse au trésor n'existe pas.");
        }
        treasureHuntRepository.deleteById(id);
        return "Succès : La chasse au trésor a été supprimée avec succès.";
    }

    public List<Participation> getParticipationsForTreasureHunt(Long treasureHuntId) {
        TreasureHunt treasureHunt = treasureHuntRepository.findById(treasureHuntId)
                .orElseThrow(() -> new EntityNotFoundException("Chasse au trésor introuvable."));
        return participationRepository.findAll().stream()
                .filter(participation -> participation.getTreasureHunt().equals(treasureHunt))
                .toList();
    }

    public ResponseEntity<?> getTreasureHuntsByPlayerId() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Player player = playerRepository.findByUserUsername(username)
                .orElseThrow(() -> new CustomException("Joueur introuvable", HttpStatus.NOT_FOUND));

        List<TreasureHunt> playerTreasureHunts = treasureHuntRepository.findAll().stream()
                .filter(treasureHunt -> treasureHunt.getCreator().equals(player))
                .toList();

        if (playerTreasureHunts.isEmpty()) {
            throw new CustomException("Erreur : Aucune chasse au trésor trouvée pour ce joueur.", HttpStatus.NOT_FOUND);
        }

        List<TreasureHuntDto> result = new ArrayList<>();
        for (TreasureHunt treasureHunt : playerTreasureHunts) {
            result.add(new TreasureHuntDto(treasureHunt));
        }

        return ResponseEntity.ok(result);
    }
}