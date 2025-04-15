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

    @GetMapping("/profile")
    public ResponseEntity<?> getPlayer() {
        return playerService.getPlayer();
    }

    @PutMapping("/{playerId}")
    public ResponseEntity<?> updatePlayer(@RequestBody PlayerDto playerDto) {
        return playerService.updatePlayer(playerDto);
    }

}