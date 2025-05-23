package com.location.locationserv.Repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.location.locationserv.Entities.Clue;

public interface ClueRepository extends JpaRepository<Clue, UUID> {

    List<Clue> findByTreasureId(UUID fromString);

    List<Clue> findByLatitudeAndLongitude(double latitude, double longitude);

}
