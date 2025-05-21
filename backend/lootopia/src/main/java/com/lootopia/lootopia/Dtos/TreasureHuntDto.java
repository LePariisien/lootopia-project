package com.lootopia.lootopia.Dtos;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.lootopia.lootopia.Entities.TreasureHunt;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TreasureHuntDto {

    private Long id;
    private String name;
    private String description;
    private int level;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;

    public TreasureHuntDto(TreasureHunt treasureHunt ) {
        this.id = Long.valueOf(treasureHunt.getId());
        this.name = treasureHunt.getName();
        this.description = treasureHunt.getDescription();
        this.level = treasureHunt.getLevel();
        this.location = treasureHunt.getLocation();
        this.startDate = treasureHunt.getStartDate();
        this.endDate = treasureHunt.getEndDate();
    }
}