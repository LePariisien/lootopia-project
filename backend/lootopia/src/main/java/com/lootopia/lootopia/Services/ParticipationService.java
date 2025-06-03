package com.lootopia.lootopia.Services;

import com.lootopia.lootopia.Dtos.ParticipationDto;
import com.lootopia.lootopia.Entities.Participation;
import com.lootopia.lootopia.Entities.Player;
import com.lootopia.lootopia.Entities.TreasureHunt;
import com.lootopia.lootopia.Exceptions.CustomException;
import com.lootopia.lootopia.Repositories.ParticipationRepository;
import com.lootopia.lootopia.Repositories.TreasureHuntRepository;
import com.lootopia.lootopia.Repositories.PlayerRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ParticipationService {

    @Autowired
    private final TreasureHuntRepository treasureHuntRepository;

    @Autowired
    private final PlayerRepository playerRepository;

    private final ParticipationRepository participationRepository;

    public ResponseEntity<?> getParticipationsByPlayer(Player player) {
        if (player == null) {
            throw new CustomException("Joueur introuvable", HttpStatus.NOT_FOUND);
        }
        List<Participation> participations = participationRepository.findByPlayer(player);

        List<ParticipationDto> participationDtos = new ArrayList<>();
        for (Participation participation : participations) {
            participationDtos.add(new ParticipationDto(participation));
        }
        return ResponseEntity.ok(participationDtos);
    }

    public ResponseEntity<?> getAllParticipations() {
        List<Participation> AllParticipations = participationRepository.findAll();
        if (AllParticipations.isEmpty()) {
            throw new CustomException("Erreur : Aucune chasse au trésor trouvée.", HttpStatus.NOT_FOUND);
        }
        List<ParticipationDto> result = new ArrayList<>();
        for (Participation participation : AllParticipations) {
            result.add(new ParticipationDto(participation));
        }
        return ResponseEntity.ok(result);
    }

    public ResponseEntity<?> getParticipationById(UUID id) {
        Participation participation = participationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Participation introuvable."));
        return ResponseEntity.ok(new ParticipationDto(participation));
    }

    public ResponseEntity<?> getParticipation(Long treasureHuntId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Player player = playerRepository.findByUserUsername(username)
                .orElseThrow(() -> new CustomException("Joueur introuvable", HttpStatus.NOT_FOUND));

        TreasureHunt treasureHunt = treasureHuntRepository.findById(treasureHuntId)
                .orElseThrow(() -> new CustomException("Chasse au trésor introuvable", HttpStatus.NOT_FOUND));

        Participation participation = participationRepository.findByTreasureHuntAndPlayer(treasureHunt, player);
        if (participation == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Aucune participation trouvée pour cette chasse au trésor.");
        }

        return ResponseEntity.ok(new ParticipationDto(participation));
    }

    public ResponseEntity<?> createParticipation(Long treasureHuntId) {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();

            Player player = playerRepository.findByUserUsername(username)
                    .orElseThrow(() -> new CustomException("Joueur introuvable", HttpStatus.NOT_FOUND));

            TreasureHunt treasureHunt = treasureHuntRepository.findById(treasureHuntId)
                    .orElseThrow(() -> new CustomException("Chasse au trésor introuvable", HttpStatus.NOT_FOUND));

            Participation participation = new Participation();
            participation.setPlayer(player);
            participation.setTreasureHunt(treasureHunt);
            participationRepository.save(participation);

            return ResponseEntity.ok("Succès : Participation créée avec succès pour la chasse au trésor '"
                    + treasureHunt.getName() + "'.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la création de la participation.");
        }
    }

    public ResponseEntity<?> deleteParticipation(UUID participationId) {
        try {

            Participation participation = participationRepository.findById(participationId)
                    .orElseThrow(() -> new CustomException("Participation introuvable", HttpStatus.NOT_FOUND));
            participationRepository.delete(participation);

            return ResponseEntity.ok("Succès : La participation a été supprimée avec succès.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la suppression de la participation.");
        }
    }
}