package com.lootopia.lootopia.Repositories;

import com.lootopia.lootopia.Entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, UUID> {
    List<Notification> findByPlayerId(UUID playerId);
}