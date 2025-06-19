package com.lootopia.lootopia.Dtos;

import java.time.LocalDateTime;
import java.util.UUID;

import com.lootopia.lootopia.Entities.PlayerArtefact;

import lombok.Data;

@Data
public class PlayerArtefactDto {

    private UUID id;

    private UUID artefactId;

    private UUID playerId;

    private LocalDateTime acquiredAt;

    public PlayerArtefactDto(PlayerArtefact playerArtefact) {
        this.id = playerArtefact.getId();
        this.artefactId = playerArtefact.getArtefact().getId();
        this.playerId = playerArtefact.getPlayer().getId();
        this.acquiredAt = playerArtefact.getAcquiredAt();
    }
}
