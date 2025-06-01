package com.lootopia.lootopia.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.UUID;

import com.lootopia.lootopia.Entities.TreasureHunt;

@AllArgsConstructor
@Data
@NoArgsConstructor
@ToString
public class TreasureHuntDto {

    private Long id;

    private String name;

    private String description;

    private int level;

    private UUID treasure_id;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private UUID organizer_id;

    private boolean isFound;

    public TreasureHuntDto(TreasureHunt treasureHunt) {
        this.id = treasureHunt.getId();
        this.name = treasureHunt.getName();
        this.description = treasureHunt.getDescription();
        this.level = treasureHunt.getLevel();
        this.treasure_id = treasureHunt.getTreasure_id();
        this.startDate = treasureHunt.getStartDate();
        this.endDate = treasureHunt.getEndDate();
        this.organizer_id = treasureHunt.getOrganizer_id();
    }

}