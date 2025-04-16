package com.lootopia.lootopia.Repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lootopia.lootopia.Entities.Player;

public interface PlayerRepository extends JpaRepository<Player, UUID> {

    Optional<Player> findByNickname(String nickname);

    Optional<Player> findByUserId(UUID userId);

    Optional<Player> findByUserUsername(String username);

}