package com.lootopia.lootopia.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lootopia.lootopia.Dtos.ArtefactDto;
import com.lootopia.lootopia.Services.ArtefactService;

@RestController
@RequestMapping("/api/artefact")
public class ArtefactController extends AbstractController {

    @Autowired
    private ArtefactService artefactService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getArtefactById(@PathVariable String id) {
        return artefactService.getArtefactById(id);
    }

    @PutMapping
    public ResponseEntity<?> updateArtefact(@RequestBody ArtefactDto artefactDto) {
        return artefactService.updateArtefact(artefactDto);
    }

    @PostMapping
    public ResponseEntity<?> createArtefact(@RequestBody ArtefactDto artefactDto) {
        return artefactService.createArtefact(artefactDto);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllArtefacts() {
        return artefactService.getAllArtefacts();
    }

    @GetMapping("/all/ordered")
    public ResponseEntity<?> getAllArtefactsGrouped() {
        return ResponseEntity.ok(artefactService.getAllArtefactsGrouped());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteArtefact(@PathVariable String id) {
        return artefactService.deleteArtefact(id);
    }

}