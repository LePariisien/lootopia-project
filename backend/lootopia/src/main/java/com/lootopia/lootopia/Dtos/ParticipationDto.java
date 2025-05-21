package com.lootopia.lootopia.Dtos;

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
    private String status;

    public ParticipationDto(Participation Participation) {
        this.id = Participation.getId();
        this.playerId = Participation.getPlayer().getId();
        this.treasureHuntId = Participation.getTreasureHunt().getId();
        this.status = Participation.getStatus();
    }

}