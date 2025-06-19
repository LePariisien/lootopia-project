package com.lootopia.lootopia.Services;

import com.lootopia.lootopia.Entities.Notification;
import com.lootopia.lootopia.Repositories.NotificationRepository;
import com.lootopia.lootopia.Repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private PlayerRepository playerRepository;

    public Notification createNotification(UUID playerId, String message) {
        Notification notification = new Notification();
        notification.setPlayer(playerRepository.findById(playerId)
                .orElseThrow(() -> new RuntimeException("Player not found")));
        notification.setDate(new Date());
        notification.setRead(false);
        notification.setMessage(message);

        return notificationRepository.save(notification);
    }
}
