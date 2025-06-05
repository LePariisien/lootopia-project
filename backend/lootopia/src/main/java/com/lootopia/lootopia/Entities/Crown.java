package com.lootopia.lootopia.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "Crowns")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Crown {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;

    @NotNull
    @Column(nullable = false)
    private int quantity;
}
