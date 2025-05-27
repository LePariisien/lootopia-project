package com.lootopia.lootopia.Dtos;

import com.lootopia.lootopia.Entities.Player;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@Data
@NoArgsConstructor
@ToString
public class PlayerDto {

    private String nickname;
    private int level;
    private String avatarUrl;
    private String bio;
    private String country;

    public PlayerDto(Player player) {
        this.nickname = player.getNickname();
        this.level = player.getLevel();
        this.avatarUrl = player.getAvatarUrl();
        this.bio = player.getBio();
        this.country = player.getCountry();
    }

}