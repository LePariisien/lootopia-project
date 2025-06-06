package com.lootopia.lootopia.Controllers;

import com.lootopia.lootopia.Dtos.ParticipationDto;
import com.lootopia.lootopia.Entities.Player;
import com.lootopia.lootopia.Services.ParticipationService;
import com.lootopia.lootopia.Services.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/participations")
@RequiredArgsConstructor
public class ParticipationController {

    private final ParticipationService participationService;
    private final PlayerService playerService;

    /**
     * Endpoint pour créer une participation.
     */
    @PostMapping
    public ResponseEntity<?> createParticipation(Long treasureHuntId) {
        return participationService.createParticipation(treasureHuntId);
    }

    /**
     * Endpoint pour récupérer les participations d'un joueur.
     */
    @GetMapping("/player/{playerId}")
    public ResponseEntity<?> getParticipationsByPlayer(@PathVariable UUID playerId) {
        Player player = playerService.getPlayerById(playerId);
        return participationService.getParticipationsByPlayer(player);
    }

    /**
     * Endpoint pour récupérer une participation par son ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getParticipationById(@PathVariable UUID id) {
        return participationService.getParticipationById(id);
    }

    @GetMapping("/treasure-hunt/{treasureHuntId}")
    public ResponseEntity<?> getParticipation(@PathVariable Long treasureHuntId) {
        return participationService.getParticipation(treasureHuntId);
    }

    @PutMapping
    public ResponseEntity<?> updateParticipation(@RequestBody ParticipationDto participationDto) {
        return participationService.updateParticipation(participationDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteParticipation(@PathVariable UUID id) {
        return participationService.deleteParticipation(id);
    }

    @GetMapping("/treasure-hunt/{treasureHuntId}/player")
    public ResponseEntity<?> getParticipationByTreasureHuntAndPlayer(@PathVariable Long treasureHuntId) {
        return participationService.getParticipationByTreasureHuntAndPlayer(treasureHuntId);
    }

}