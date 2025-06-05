package com.lootopia.lootopia.Dtos;

import lombok.*;
import java.util.UUID;

import com.lootopia.lootopia.Entities.Purchase;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseDto {
    private UUID player_id;
    private int crowns;
    private double price;
    private Date date;
    private String title;
    private String sub;
    private String oldPrice;
    private String discount;
    private String badge;
    private String bonus;
    private String img;

    public PurchaseDto(Purchase purchase) {
        this.player_id = purchase.getPlayer().getId();
        this.crowns = purchase.getCrowns();
        this.price = purchase.getPrice();
        this.date = purchase.getDate();
        this.title = purchase.getTitle();
        this.sub = purchase.getSub();
        this.oldPrice = purchase.getOldPrice();
        this.discount = purchase.getDiscount();
        this.badge = purchase.getBadge();
        this.bonus = purchase.getBonus();
        this.img = purchase.getImg();
    }
}
