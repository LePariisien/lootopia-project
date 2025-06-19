package com.lootopia.lootopia.Services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.lootopia.lootopia.Dtos.PlayerArtefactDto;
import com.lootopia.lootopia.Entities.Artefact;
import com.lootopia.lootopia.Entities.Player;
import com.lootopia.lootopia.Entities.PlayerArtefact;
import com.lootopia.lootopia.Repositories.ArtefactRepository;
import com.lootopia.lootopia.Repositories.PlayerArtefactRepository;

@Service
public class PlayerArtefactService {

    @Autowired
    private PlayerArtefactRepository playerArtefactRepository;

    @Autowired
    private ArtefactRepository artefactRepository;

    @Autowired
    private PlayerService playerService;

    public ResponseEntity<?> getPlayerArtefactById(String id) {
        PlayerArtefact playerArtefact = playerArtefactRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new RuntimeException("PlayerArtefact not found with id: " + id));
        return ResponseEntity.ok(new PlayerArtefactDto(playerArtefact));
    }

    public ResponseEntity<?> createPlayerArtefact(String artefactId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Player player = playerService.getPlayerByUsername(username);
        if (player == null) {
            return ResponseEntity.badRequest().body("Joueur introuvable");
        }

        Artefact artefact = artefactRepository.findById(UUID.fromString(artefactId))
                .orElseThrow(
                        () -> new RuntimeException("Artefact introuvable"));

        PlayerArtefact playerArtefact = PlayerArtefact.builder()
                .artefact(artefact)
                .player(player)
                .acquiredAt(null)
                .build();

        PlayerArtefact savedPlayerArtefact = playerArtefactRepository.save(playerArtefact);
        return ResponseEntity.ok(new PlayerArtefactDto(savedPlayerArtefact));
    }

    public ResponseEntity<?> getAllPlayerArtefactsByToken() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Player player = playerService.getPlayerByUsername(username);
        if (player == null) {
            return ResponseEntity.badRequest().body("Joueur introuvable");
        }

        List<PlayerArtefact> artefacts = playerArtefactRepository.findAllByPlayerId(player.getId());
        return ResponseEntity.ok(artefacts.stream()
                .map(PlayerArtefactDto::new)
                .toList());
    }

    public ResponseEntity<?> deletePlayerArtefact(String id) {
        PlayerArtefact playerArtefact = playerArtefactRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new RuntimeException("PlayerArtefact not found with id: " + id));

        playerArtefactRepository.delete(playerArtefact);
        return ResponseEntity.ok("PlayerArtefact supprimé avec succès");
    }
}
