package com.location.locationserv.Dtos;

import java.util.UUID;

import com.location.locationserv.Entities.Clue;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@Data
@NoArgsConstructor
@ToString
public class ClueDto {

    private UUID id;

    private double latitude;

    private double longitude;

    private String message;

    private UUID treasureId;

    public ClueDto(Clue clue) {
        this.id = clue.getId();
        this.latitude = clue.getLatitude();
        this.longitude = clue.getLongitude();
        this.message = clue.getMessage();
        this.treasureId = clue.getTreasure().getId();
    }

}
