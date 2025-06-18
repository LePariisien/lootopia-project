package com.lootopia.lootopia.Dtos;

import lombok.*;
import java.util.UUID;
import com.lootopia.lootopia.Entities.Crown;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CrownDto {
    private UUID id;
    private UUID player_id;
    private int quantity;

    public CrownDto(Crown crown) {
        this.id = crown.getId();
        this.player_id = crown.getPlayer().getId();
        this.quantity = crown.getQuantity();
    }
}