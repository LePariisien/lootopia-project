package com.lootopia.lootopia.Entities;

import org.springframework.data.annotation.CreatedDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.util.Date;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@Table(name ="TreasureHunts")
@Getter
@Setter
@AllArgsConstructor
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
    @Size(min = 1, max = 3)
    private int level;

    @NotNull
    @Size(min = 1, max = 200)
    private String location;

    @NotNull
    private LocalDate startDate; 

    @NotNull
    private LocalDate endDate;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Setter(AccessLevel.PRIVATE)
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Date atedAt;
}
