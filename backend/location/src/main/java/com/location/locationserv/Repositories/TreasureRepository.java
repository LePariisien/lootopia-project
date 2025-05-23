package com.location.locationserv.Repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.location.locationserv.Entities.Treasure;

public interface TreasureRepository extends JpaRepository<Treasure, UUID> {

        List<Treasure> findByLatitudeAndLongitude(double latitude, double longitude);

        @Query(value = "SELECT * FROM Treasure t WHERE " +
                        "(6371000 * acos(cos(radians(:latitude)) * cos(radians(t.latitude)) * " +
                        "cos(radians(t.longitude) - radians(:longitude)) + " +
                        "sin(radians(:latitude)) * sin(radians(t.latitude)))) < :distance", nativeQuery = true)
        List<Treasure> findTreasureNerby(
                        @Param("latitude") double latitude,
                        @Param("longitude") double longitude,
                        @Param("distance") double distance);

}
