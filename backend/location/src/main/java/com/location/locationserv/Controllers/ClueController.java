package com.location.locationserv.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.location.locationserv.Dtos.ClueDto;
import com.location.locationserv.Services.ClueService;

@RestController
@RequestMapping("/api/clue")
public class ClueController extends AbstractController {

    @Autowired
    private ClueService clueService;

    @PostMapping
    public ResponseEntity<?> createClue(@RequestBody ClueDto clueDto) {
        return clueService.create(clueDto);
    }

    @PostMapping("/batch")
    public ResponseEntity<?> createClue(@RequestBody List<ClueDto> clueDtos) {
        return clueService.create(clueDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClue(@PathVariable String id) {
        return clueService.get(id);
    }

    @PutMapping
    public ResponseEntity<?> updateClue(@RequestBody ClueDto clueDto) {
        return clueService.update(clueDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClue(@PathVariable String id) {
        return clueService.delete(id);
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllClues() {
        return clueService.getAll();
    }

    @GetMapping("/treasure/{treasureId}")
    public ResponseEntity<?> getCluesByTreasureId(@PathVariable String treasureId) {
        return clueService.getByTreasureId(treasureId);
    }

    @GetMapping("/getByStep/{treasureId}/{step}")
    public ResponseEntity<?> getClueByStep(@PathVariable String treasureId, @PathVariable int step) {
        return clueService.getByStep(treasureId, step);
    }

    @GetMapping("/getByLocation/{latitude}/{longitude}")
    public ResponseEntity<?> getClueByLocation(@PathVariable double latitude, @PathVariable double longitude) {
        return clueService.getByLocation(latitude, longitude);
    }

    @GetMapping("/digAHole")
    public ResponseEntity<?> digAHole(
            @RequestParam String treasureId,
            @RequestParam double latitude,
            @RequestParam double longitude,
            @RequestParam(required = false, defaultValue = "5") double distance) {
        return clueService.digAHole(treasureId, latitude, longitude, distance);
    }

}