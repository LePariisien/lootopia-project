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


    /**
     * Récupère toutes les participations d'un joueur.
     */
    public ResponseEntity<?> getParticipationsByPlayer(Player player) {
        // Vérifier si le joueur existe
        if (player == null) {
            throw new CustomException("Joueur introuvable", HttpStatus.NOT_FOUND);
        }
        List<Participation> participations =  participationRepository.findByPlayer(player);

        // Convertir les participations en DTOs
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
    /**
     * Récupère une participation par son ID.
     */
    public ResponseEntity<?> getParticipationById(UUID id) {
        Participation participation =  participationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Participation introuvable."));
        return ResponseEntity.ok(new ParticipationDto(participation));
    }

    public ResponseEntity<?> createParticipation(Long treasureHuntId) {
        try {
            // Récupérer le nom d'utilisateur de l'utilisateur authentifié
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            System.out.println("Nom d'utilisateur authentifié : " + username);

            // Trouver le joueur associé à cet utilisateur
            Player player = playerRepository.findByUserUsername(username)
                    .orElseThrow(() -> new CustomException("Joueur introuvable", HttpStatus.NOT_FOUND));
            System.out.println("Joueur trouvé : " + player.getNickname());

            // Trouver la chasse au trésor par son ID
            TreasureHunt treasureHunt = treasureHuntRepository.findById(treasureHuntId)
                    .orElseThrow(() -> new CustomException("Chasse au trésor introuvable", HttpStatus.NOT_FOUND));
            System.out.println("Chasse au trésor trouvée : " + treasureHunt.getName());

            // Créer une nouvelle participation
            Participation participation = new Participation();
            participation.setPlayer(player);
            participation.setTreasureHunt(treasureHunt);

            // Sauvegarder la participation
            participationRepository.save(participation);
            System.out.println("Participation créée avec succès pour la chasse au trésor : " + treasureHunt.getName());

            return ResponseEntity.ok("Succès : Participation créée avec succès pour la chasse au trésor '" + treasureHunt.getName() + "'.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la création de la participation.");
        }
    }

    public ResponseEntity<?> deleteParticipation(UUID participationId) {
        try {
            // Vérifier si la participation existe
            Participation participation = participationRepository.findById(participationId)
                    .orElseThrow(() -> new CustomException("Participation introuvable", HttpStatus.NOT_FOUND));
            System.out.println("Participation trouvée pour suppression : " + participation.getId());

            // Supprimer la participation
            participationRepository.delete(participation);
            System.out.println("Participation supprimée avec succès : " + participation.getId());

            return ResponseEntity.ok("Succès : La participation a été supprimée avec succès.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la suppression de la participation.");
        }
    }
}