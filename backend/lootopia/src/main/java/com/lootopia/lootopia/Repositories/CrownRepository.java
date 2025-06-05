package com.lootopia.lootopia.Repositories;

import com.lootopia.lootopia.Entities.Crown;
import com.lootopia.lootopia.Entities.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface CrownRepository extends JpaRepository<Crown, UUID> {
    Optional<Crown> findByPlayer(Player player);
}