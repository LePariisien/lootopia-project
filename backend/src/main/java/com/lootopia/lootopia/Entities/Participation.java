package com.lootopia.lootopia.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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
    @Column(updatable = false, nullable = false)
    private UUID id;

    @NotNull
    @ManyToOne // many participations for one user
    private User user;

    @NotNull
    @ManyToOne //many patipations for one treasure hunt
    private TreasureHunt treasureHunt;

    @NotNull
    @Column(nullable = false)
    private double progress; // Progress percentage (e.g., 50.0 for 50%)

    @NotNull
    @Column(nullable = false)
    private String status; // Status of the participation (e.g., "in progress", "completed")
}
