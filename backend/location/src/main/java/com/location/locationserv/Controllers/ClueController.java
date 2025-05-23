package com.location.locationserv.Controllers;

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

    @GetMapping("/getByTreasureId/{treasureId}")
    public ResponseEntity<?> getCluesByTreasureId(@PathVariable String treasureId) {
        return clueService.getByTreasureId(treasureId);
    }

    @GetMapping("/getByLocation/{latitude}/{longitude}")
    public ResponseEntity<?> getCluesByLocation(@PathVariable double latitude, @PathVariable double longitude) {
        return clueService.getByLocation(latitude, longitude);
    }

}