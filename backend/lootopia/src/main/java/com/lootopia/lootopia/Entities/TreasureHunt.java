package com.lootopia.lootopia.Entities;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Data
@Entity
@NoArgsConstructor
@Table(name = "TreasureHunts")
public class TreasureHunt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1, max = 100)
    private String name;

    @Size(max = 500)
    private String description;

    @NotNull
    @Size(min = 1, max = 3)
    private int level;

    @NotNull
    private UUID treasure_id;

    @NotNull
    private LocalDateTime startDate;

    @NotNull
    private LocalDateTime endDate;

    @NotNull
    private UUID organizer_id;

    @NotNull
    @Column(name = "is_found")
    private boolean isFound;

    @OneToMany(mappedBy = "treasureHunt", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Participation> participations = new ArrayList<>();

    @Setter(AccessLevel.PRIVATE)
    @CreationTimestamp
    @NotNull
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

}
