package com.lootopia.lootopia.Entities;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@Data
@Entity
@NoArgsConstructor
@Table(name = "Participations")
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
    @Column(name = "current_step")
    private int currentStep;

    @NotNull
    private double progress;

    @NotNull
    private String status;

    @NotNull
    private Boolean isWinner;

    private String notes;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

}
