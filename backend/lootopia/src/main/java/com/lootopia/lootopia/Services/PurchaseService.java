package com.lootopia.lootopia.Services;

import com.lootopia.lootopia.Dtos.PurchaseDto;
import com.lootopia.lootopia.Entities.Player;
import com.lootopia.lootopia.Entities.Purchase;
import com.lootopia.lootopia.Repositories.PlayerRepository;
import com.lootopia.lootopia.Repositories.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PurchaseService {
    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private PlayerRepository playerRepository;

    public Purchase createPurchase(PurchaseDto purchaseDto) {
        Player player = playerRepository.findById(purchaseDto.getPlayer_id())
                .orElseThrow(() -> new RuntimeException("Player not found"));
        Purchase purchase = new Purchase();
        purchase.setPlayer(player);
        purchase.setCrowns(purchaseDto.getCrowns());
        purchase.setPrice(purchaseDto.getPrice());
        purchase.setDate(purchaseDto.getDate());
        purchase.setTitle(purchaseDto.getTitle());
        purchase.setSubtitle(purchaseDto.getSubtitle());
        purchase.setOldPrice(purchaseDto.getOldPrice());
        purchase.setDiscount(purchaseDto.getDiscount());
        purchase.setBadge(purchaseDto.getBadge());
        purchase.setBonus(purchaseDto.getBonus());
        purchase.setImg(purchaseDto.getImg());
        return purchaseRepository.save(purchase);
    }

    public List<PurchaseDto> getPurchasesByPlayerId(UUID playerId) {
        if (!playerRepository.existsById(playerId)) {
            throw new RuntimeException("Player not found");
        }
        return purchaseRepository.findByPlayerId(playerId).stream()
                .map(purchase -> new PurchaseDto(purchase))
                .toList();
    }
}
