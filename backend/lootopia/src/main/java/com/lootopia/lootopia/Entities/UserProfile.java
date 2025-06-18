package com.lootopia.lootopia.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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

    @OneToOne
    @JoinColumn(name = "player_id")
    private Player player;

}
