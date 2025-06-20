package com.lootopia.lootopia.Controllers;

import com.lootopia.lootopia.Dtos.PurchaseDto;
import com.lootopia.lootopia.Entities.Purchase;
import com.lootopia.lootopia.Services.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;

    @PostMapping
    public ResponseEntity<PurchaseDto> createPurchase(@RequestBody PurchaseDto purchaseDto) {
        Purchase saved = purchaseService.createPurchase(purchaseDto);
        return ResponseEntity.ok(new PurchaseDto(saved));
    }

    @GetMapping("/player/{playerId}")
    public List<PurchaseDto> getPurchasesByPlayerId(@PathVariable UUID playerId) {
        return purchaseService.getPurchasesByPlayerId(playerId);
    }
}
