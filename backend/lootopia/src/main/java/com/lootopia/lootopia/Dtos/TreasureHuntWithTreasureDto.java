package com.lootopia.lootopia.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@Data
@NoArgsConstructor
@ToString
public class TreasureHuntWithTreasureDto {

    private Long id;

    private String name;

    private String description;

    private int level;

    private UUID treasure_id;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private UUID organizer_id;

    private boolean isFound;

    private TreasureDto treasure;

}