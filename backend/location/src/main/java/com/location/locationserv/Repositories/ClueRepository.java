package com.location.locationserv.Repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.location.locationserv.Entities.Clue;

public interface ClueRepository extends JpaRepository<Clue, UUID> {

        List<Clue> findByTreasureId(UUID fromString);

        Clue findByLatitudeAndLongitude(double latitude, double longitude);

        @Query(value = "SELECT * FROM Clue t WHERE " +
                        "t.treasure_id = :treasureId AND " +
                        "(6371000 * acos(cos(radians(:latitude)) * cos(radians(t.latitude)) * " +
                        "cos(radians(t.longitude) - radians(:longitude)) + " +
                        "sin(radians(:latitude)) * sin(radians(t.latitude)))) < :distance", nativeQuery = true)
        List<Clue> findClueNerby(
                        @Param("treasureId") UUID treasureId,
                        @Param("latitude") double latitude,
                        @Param("longitude") double longitude,
                        @Param("distance") double distance);

        Clue findByTreasureIdAndStep(UUID treasureId, int step);
}
