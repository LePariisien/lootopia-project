package com.lootopia.lootopia.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Steps")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Step {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @NotNull
    @Size(max = 500)
    @Column(nullable = false)
    private String description;
    @NotNull
    @Column(nullable = false)
    private double latitude; 

    @NotNull
    @Column(nullable = false)
    private double longitude; 
    @Size(max = 200)
    private String clue; 
    @NotNull
    @Column(nullable = false)
    private boolean validated; 
}
