package com.lootopia.lootopia.Entities;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "crown_balance")
    private int crownBalance;

    @Column(name = "hunts_completed")
    private int huntsCompleted;

    @Column(name = "treasures_found")
    private int treasuresFound;

    @Column(name = "riddles_solved")
    private int riddlesSolved;

    @Column(name = "badges_won")
    private int badgesWon;

    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public int getCrownBalance() { return crownBalance; }
    public void setCrownBalance(int crownBalance) { this.crownBalance = crownBalance; }

    public int getHuntsCompleted() { return huntsCompleted; }
    public void setHuntsCompleted(int huntsCompleted) { this.huntsCompleted = huntsCompleted; }

    public int getTreasuresFound() { return treasuresFound; }
    public void setTreasuresFound(int treasuresFound) { this.treasuresFound = treasuresFound; }

    public int getRiddlesSolved() { return riddlesSolved; }
    public void setRiddlesSolved(int riddlesSolved) { this.riddlesSolved = riddlesSolved; }

    public int getBadgesWon() { return badgesWon; }
    public void setBadgesWon(int badgesWon) { this.badgesWon = badgesWon; }
}

