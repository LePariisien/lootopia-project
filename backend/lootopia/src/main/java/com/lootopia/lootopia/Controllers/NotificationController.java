package com.lootopia.lootopia.Controllers;

import com.lootopia.lootopia.Repositories.NotificationRepository;
import com.lootopia.lootopia.Repositories.PlayerRepository;
import com.lootopia.lootopia.Dtos.NotificationDto;
import com.lootopia.lootopia.Entities.Notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private final NotificationRepository notificationRepository;

    @Autowired
    private final PlayerRepository playerRepository;

    public NotificationController(NotificationRepository notificationRepository, PlayerRepository playerRepository) {
        this.notificationRepository = notificationRepository;
        this.playerRepository = playerRepository;
    }

    @PostMapping("/create")
    public NotificationDto createNotification(@RequestBody NotificationDto notificationDto) {
        Notification notification = new Notification();
        notification.setPlayer(playerRepository.findById(notificationDto.getPlayerId())
                .orElseThrow(() -> new RuntimeException("Player not found")));
        notification.setDate(notificationDto.getDate());
        notification.setRead(notificationDto.isRead());
        notification.setMessage(notificationDto.getMessage());

        Notification savedNotification = notificationRepository.save(notification);
        return new NotificationDto(savedNotification);
    }

    @GetMapping("/player/{playerId}")
    public ResponseEntity<?> getNotificationsByPlayerId(@PathVariable UUID playerId) {
        List<Notification> notifications = notificationRepository.findByPlayerId(playerId);
        List<NotificationDto> dtos = notifications.stream().map(NotificationDto::new).toList();
        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/update-read/{notificationId}")
    public ResponseEntity<?> updateNotification(@PathVariable UUID notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setRead(true);

        Notification updatedNotification = notificationRepository.save(notification);
        return ResponseEntity.ok(new NotificationDto(updatedNotification));
    }
}
