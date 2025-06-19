package com.lootopia.lootopia.Repositories;

import com.lootopia.lootopia.Entities.PlayerArtefact;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PlayerArtefactRepository extends JpaRepository<PlayerArtefact, UUID> {

    List<PlayerArtefact> findAllByPlayerId(UUID id);

}