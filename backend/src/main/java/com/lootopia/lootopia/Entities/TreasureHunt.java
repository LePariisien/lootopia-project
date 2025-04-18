package com.lootopia.lootopia.Entities;

import org.springframework.data.annotation.CreatedDate;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "TreasureHunts")
@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
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
    @Min(1)
    @Max(10)
    private int level;

    @NotNull
    @Size(min = 1, max = 200)
    private String location;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private Player creator;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Date createdAt;
}
