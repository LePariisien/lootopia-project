package com.location.locationserv.Dtos;

import java.util.List;
import java.util.UUID;

import com.location.locationserv.Entities.Treasure;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@Data
@NoArgsConstructor
@ToString
public class TreasureWithDetailDto {

    private UUID id;

    private double latitude;

    private double longitude;

    private List<ClueDto> clues;

    public TreasureWithDetailDto(Treasure treasure) {
        this.id = treasure.getId();
        this.latitude = treasure.getLatitude();
        this.longitude = treasure.getLongitude();
        this.clues = treasure.getClues().stream().map(clue -> new ClueDto(clue)).toList();
    }

}
