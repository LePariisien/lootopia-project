package com.lootopia.lootopia.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lootopia.lootopia.Services.PlayerArtefactService;

@RestController
@RequestMapping("/api/player-artefact")
public class PlayerArtefactController extends AbstractController {

    @Autowired
    private PlayerArtefactService playerArtefactService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getPlayerArtefactById(@PathVariable String id) {
        return playerArtefactService.getPlayerArtefactById(id);
    }

    @PostMapping("/{artefactId}")
    public ResponseEntity<?> createPlayerArtefact(@PathVariable String artefactId) {
        return playerArtefactService.createPlayerArtefact(artefactId);
    }

    @GetMapping("/all/token")
    public ResponseEntity<?> getAllPlayerArtefactsByToken() {
        return playerArtefactService.getAllPlayerArtefactsByToken();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlayerArtefact(@PathVariable String id) {
        return playerArtefactService.deletePlayerArtefact(id);
    }

}