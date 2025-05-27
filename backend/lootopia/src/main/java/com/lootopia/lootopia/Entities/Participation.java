package com.lootopia.lootopia.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "Participations")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Participation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "player_id", nullable = false)
    private Player player; // Joueur qui participe

    @ManyToOne
    @JoinColumn(name = "treasure_hunt_id", nullable = false)
    private TreasureHunt treasureHunt; // Chasse au trésor concernée

    @NotNull
    @Column(nullable = false)
    private String status = "pending"; // Statut de la participation : pending, accepted, rejected
}