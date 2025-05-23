package com.location.locationserv.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.location.locationserv.Dtos.TreasureDto;
import com.location.locationserv.Services.TreasureService;

@RestController
@RequestMapping("/api/treasure")
public class TreasureController extends AbstractController {

    @Autowired
    private TreasureService treasureService;

    @PostMapping
    public ResponseEntity<?> createTreasure(@RequestBody TreasureDto treasureDto) {
        return treasureService.create(treasureDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTreasure(@PathVariable String id) {
        return treasureService.get(id);
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<?> getWithDetailTreasure(@PathVariable String id) {
        return treasureService.getWithDetails(id);
    }

    @PutMapping
    public ResponseEntity<?> updateTreasure(@RequestBody TreasureDto treasureDto) {
        return treasureService.update(treasureDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTreasure(@PathVariable String id) {
        return treasureService.delete(id);
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllTreasures() {
        return treasureService.getAll();
    }

    @GetMapping("/getAll/details")
    public ResponseEntity<?> getAllTreasuresWithDetails() {
        return treasureService.getAllWithDetails();
    }

    @GetMapping("/getByLocation/{latitude}/{longitude}")
    public ResponseEntity<?> getTreasuresByLocation(@PathVariable double latitude, @PathVariable double longitude) {
        return treasureService.getByLocation(latitude, longitude);
    }

    @GetMapping("/getLocationsNearby")
    public ResponseEntity<?> getLocationsNearby(
            @RequestParam double latitude,
            @RequestParam double longitude,
            @RequestParam(required = false, defaultValue = "1000") double distance) {
        return treasureService.getLocationsNearby(latitude, longitude, distance);
    }

}