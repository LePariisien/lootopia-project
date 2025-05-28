package com.lootopia.lootopia.Dtos;

import java.util.UUID;

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

    private String address;

    private String message;

    private int step;

    private UUID treasureId;

}
