package com.lootopia.lootopia.Dtos;

import java.time.LocalDateTime;
import java.util.UUID;

import com.lootopia.lootopia.Entities.Participation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@Data
@NoArgsConstructor
@ToString
public class ParticipationDto {

    private UUID id;
    private UUID playerId;
    private Long treasureHuntId;
    private int currentStep;
    private double progress;
    private String status;
    private Boolean isWinner;
    private String notes;
    private LocalDateTime createdAt;

    public ParticipationDto(Participation participation) {
        this.id = participation.getId();
        this.playerId = participation.getPlayer().getId();
        this.treasureHuntId = participation.getTreasureHunt().getId();
        this.currentStep = participation.getCurrentStep();
        this.progress = participation.getProgress();
        this.status = participation.getStatus();
        this.isWinner = participation.getIsWinner();
        this.notes = participation.getNotes();
        this.createdAt = participation.getCreatedAt();
    }

}