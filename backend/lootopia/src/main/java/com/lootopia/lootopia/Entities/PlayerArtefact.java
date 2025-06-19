package com.lootopia.lootopia.Entities;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "player_artefacts")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlayerArtefact {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artefact_id", nullable = false)
    private Artefact artefact;

    @CreationTimestamp
    private LocalDateTime acquiredAt;

}
