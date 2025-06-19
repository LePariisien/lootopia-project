package com.lootopia.lootopia.Controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lootopia.lootopia.Entities.Crown;
import com.lootopia.lootopia.Dtos.CrownDto;
import com.lootopia.lootopia.Services.CrownService;

@RestController
@RequestMapping("/api")
public class CrownController {

    @Autowired
    private CrownService crownService;

    @PostMapping("/crowns")
    public ResponseEntity<CrownDto> buyCrowns(@RequestBody CrownDto crownDto) {
        Crown saved = crownService.createCrown(crownDto);
        return ResponseEntity.ok(new CrownDto(saved));
    }

    @GetMapping("/crowns/player/{playerId}")
    public ResponseEntity<CrownDto> getCrownByPlayer(@PathVariable UUID playerId) {
        CrownDto dto = crownService.getCrownDtoByPlayerId(playerId);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/crownsByToken")
    public ResponseEntity<CrownDto> getCrown() {
        return ResponseEntity.ok(crownService.getCrown());
    }

    @PostMapping("/crowns/minus/{amount}")
    public ResponseEntity<?> minusCrowns(@PathVariable int amount) {
        return crownService.minusCrowns(amount);
    }
}
