package com.location.location_service.Repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.location.location_service.Entities.Clue;

public interface ClueRepository extends JpaRepository<Clue, UUID> {

}
