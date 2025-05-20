package com.location.location_service.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.location.location_service.Entities.Clue;
import com.location.location_service.Services.ClueService;

@RestController
@RequestMapping("/api/clue")
public class ClueController extends AbstractController {

    @Autowired
    private ClueService clueService;

    @PostMapping
    public ResponseEntity<?> createClue(@RequestBody Clue clue) {
        return clueService.create(clue);
    }

    @GetMapping
    public ResponseEntity<?> getClue(@PathVariable String id) {
        return clueService.get(id);
    }

    @PutMapping
    public ResponseEntity<?> updateClue(@RequestBody Clue clue) {
        return clueService.update(clue);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteClue(@PathVariable String id) {
        return clueService.delete(id);
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllClues() {
        return clueService.getAll();
    }

    @GetMapping("/getByTreasureId/{treasureId}")
    public String getCluesByTreasureId(@PathVariable String treasureId) {
        return clueService.getByTreasureId(treasureId);
    }

    @GetMapping("/getByLocation/{latitude}/{longitude}")
    public String getCluesByLocation(@PathVariable double latitude, @PathVariable double longitude) {
        return clueService.getByLocation(latitude, longitude);
    }

}