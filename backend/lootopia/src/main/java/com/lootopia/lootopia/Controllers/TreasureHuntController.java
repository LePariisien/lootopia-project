package com.lootopia.lootopia.Controllers;

import com.lootopia.lootopia.Dtos.TreasureHuntDto;
import com.lootopia.lootopia.Dtos.TreasureHuntWithTreasureDto;
import com.lootopia.lootopia.Services.TreasureHuntService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/treasure-hunt")
@RequiredArgsConstructor
public class TreasureHuntController {

    private final TreasureHuntService treasureHuntService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody TreasureHuntWithTreasureDto dto) {
        return treasureHuntService.create(dto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        return treasureHuntService.get(id);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return treasureHuntService.getAll();
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody TreasureHuntDto dto) {
        return treasureHuntService.update(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return treasureHuntService.delete(id);
    }

    @GetMapping("/digAHole")
    public ResponseEntity<?> digAHole(
            @RequestParam String treasureId,
            @RequestParam double latitude,
            @RequestParam double longitude,
            @RequestParam(required = false, defaultValue = "15") double distance) {
        return treasureHuntService.digAHole(treasureId, latitude, longitude, distance);
    }

}
