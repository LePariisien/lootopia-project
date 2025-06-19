package com.lootopia.lootopia.Entities;

import java.util.UUID;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "Artefacts")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Artefact {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @NotNull
    @Size(min = 1, max = 100)
    private String name;

    @NotNull
    @Size(max = 500)
    private String description;

    @NotNull
    private double price;

    @NotNull
    private String rarity;

    @NotNull
    private String rarityColor;

    @NotNull
    private String effect;

    @NotNull
    private String image;

}
