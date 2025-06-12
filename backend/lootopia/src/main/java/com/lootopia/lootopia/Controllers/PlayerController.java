package com.lootopia.lootopia.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lootopia.lootopia.Dtos.PlayerDto;
import com.lootopia.lootopia.Services.PlayerService;

@RestController
@RequestMapping("/api/player")
public class PlayerController extends AbstractController {

    @Autowired
    private PlayerService playerService;

    @GetMapping
    public ResponseEntity<?> getPlayer() {
        return playerService.getPlayer();
    }

    @GetMapping("/nickname/{nickname}")
    public ResponseEntity<?> getPlayerByNickname(@PathVariable String nickname) {
        return playerService.getPlayerByNickname(nickname);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getPlayerById(@PathVariable String id) {
        return playerService.getPlayerById(id);
    }

    @PutMapping
    public ResponseEntity<?> updatePlayer(@RequestBody PlayerDto playerDto) {
        return playerService.updatePlayer(playerDto);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @GetMapping("/count")
    public ResponseEntity<?> getPlayerCount() {
        return playerService.getPlayerCount();
    }

}