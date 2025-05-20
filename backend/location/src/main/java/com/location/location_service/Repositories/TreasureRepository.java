package com.location.location_service.Repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.location.location_service.Entities.Treasure;

public interface TreasureRepository extends JpaRepository<Treasure, UUID> {

}
