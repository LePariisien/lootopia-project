package com.lootopia.lootopia.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "Purchases")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;

    @NotNull
    @Min(1)
    @Column(nullable = false)
    private int crowns;

    @NotNull
    @Min(0)
    @Column(nullable = false)
    private double price;

    @NotNull
    @Column(nullable = false)
    private Date date;

    private String title;
    private String subtitle;
    private String oldPrice;
    private String discount;
    private String badge;
    private String bonus;
    private String img;
}
