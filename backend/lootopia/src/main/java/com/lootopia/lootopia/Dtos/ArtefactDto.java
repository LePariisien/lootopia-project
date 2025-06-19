package com.lootopia.lootopia.Dtos;

import java.util.UUID;

import com.lootopia.lootopia.Entities.Artefact;

import lombok.Data;

@Data
public class ArtefactDto {

    private UUID id;

    private String name;

    private String description;

    private double price;

    private String rarity;

    private String rarityColor;

    private String effect;

    private String image;

    public ArtefactDto(Artefact artefact) {
        this.id = artefact.getId();
        this.name = artefact.getName();
        this.description = artefact.getDescription();
        this.price = artefact.getPrice();
        this.rarity = artefact.getRarity();
        this.rarityColor = artefact.getRarityColor();
        this.effect = artefact.getEffect();
        this.image = artefact.getImage();
    }
}
