package com.lootopia.lootopia.Entities;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Participations")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Participation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @NotNull
    @Column(updatable = false)
    private UUID id;

    @NotNull
    @ManyToOne
    private Player player;

    @NotNull
    @ManyToOne
    private TreasureHunt treasureHunt;

    @NotNull
    private double progress;

    @NotNull
    private String status;

}
