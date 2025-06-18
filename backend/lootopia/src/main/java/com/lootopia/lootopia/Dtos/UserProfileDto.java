package com.lootopia.lootopia.Dtos;

import java.util.UUID;

import com.lootopia.lootopia.Entities.UserProfile;

public class UserProfileDto {
    public String avatarUrl;
    public int crownBalance;
    public int huntsCompleted;
    public int treasuresFound;
    public int riddlesSolved;
    public int badgesWon;
    public UUID playerId;

    public UserProfileDto(UserProfile userProfile) {
        this.avatarUrl = userProfile.getAvatarUrl();
        this.crownBalance = userProfile.getCrownBalance();
        this.huntsCompleted = userProfile.getHuntsCompleted();
        this.treasuresFound = userProfile.getTreasuresFound();
        this.riddlesSolved = userProfile.getRiddlesSolved();
        this.badgesWon = userProfile.getBadgesWon();
        this.playerId = userProfile.getPlayer().getId();
    }
}
