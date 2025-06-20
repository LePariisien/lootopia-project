package com.lootopia.lootopia.Controllers;

import com.lootopia.lootopia.Dtos.PurchaseDto;
import com.lootopia.lootopia.Entities.Purchase;
import com.lootopia.lootopia.Services.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;
    
    @PostMapping("/purchases")
    public ResponseEntity<PurchaseDto> createPurchase(@RequestBody PurchaseDto purchaseDto) {
        Purchase saved = purchaseService.createPurchase(purchaseDto);
        return ResponseEntity.ok(new PurchaseDto(saved));
    }
}
