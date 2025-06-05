package com.lootopia.lootopia.Repositories;

import com.lootopia.lootopia.Entities.Participation;
import com.lootopia.lootopia.Entities.Player;
import com.lootopia.lootopia.Entities.TreasureHunt;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ParticipationRepository extends JpaRepository<Participation, UUID> {

    List<Participation> findByPlayer(Player player);

    Participation findByTreasureHuntAndPlayer(TreasureHunt treasureHunt, Player player);
}