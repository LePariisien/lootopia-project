package com.location.locationserv.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@AllArgsConstructor
@Builder
@Data
@Entity
@NoArgsConstructor
public class Clue {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    private double latitude;

    private double longitude;

    @NonNull
    private String address;

    @NonNull
    private String message;

    private int step;

    @ManyToOne
    @JoinColumn(name = "treasure_id")
    @NonNull
    private Treasure treasure;

}
