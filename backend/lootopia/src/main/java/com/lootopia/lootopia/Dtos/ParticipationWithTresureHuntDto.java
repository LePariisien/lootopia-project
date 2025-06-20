package com.lootopia.lootopia.Dtos;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@Data
@NoArgsConstructor
@ToString
public class ParticipationWithTresureHuntDto {

    private UUID id;

    private UUID playerId;

    private Long treasureHuntId;

    private int currentStep;

    private double progress;

    private String status;

    private Boolean isWinner;

    private LocalDateTime createdAt;

    private String name;

    private String description;

    private LocalDateTime endDate;

    public ParticipationWithTresureHuntDto(ParticipationDto participation, TreasureHuntDto treasure) {
        this.id = participation.getId();
        this.playerId = participation.getPlayerId();
        this.treasureHuntId = participation.getTreasureHuntId();
        this.currentStep = participation.getCurrentStep();
        this.progress = participation.getProgress();
        this.status = participation.getStatus();
        this.isWinner = participation.getIsWinner();
        this.createdAt = participation.getCreatedAt();
        this.name = treasure.getName();
        this.description = treasure.getDescription();
        this.endDate = treasure.getEndDate();
    }

}