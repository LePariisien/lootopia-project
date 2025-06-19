package com.lootopia.lootopia.Dtos;

import java.util.Date;
import java.util.UUID;

import com.lootopia.lootopia.Entities.Notification;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDto {

    private UUID id;
    private UUID playerId;
    private String message;
    private Date date;
    private boolean isRead;

    public NotificationDto(Notification notification) {
        this.id = notification.getId();
        this.playerId = notification.getPlayer().getId();
        this.message = notification.getMessage();
        this.date = notification.getDate();
        this.isRead = notification.isRead();
    }

}
