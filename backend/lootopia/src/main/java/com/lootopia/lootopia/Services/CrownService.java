package com.lootopia.lootopia.Services;

import com.lootopia.lootopia.Dtos.CrownDto;
import com.lootopia.lootopia.Entities.Crown;
import com.lootopia.lootopia.Entities.Player;
import com.lootopia.lootopia.Exceptions.CustomException;
import com.lootopia.lootopia.Repositories.CrownRepository;
import com.lootopia.lootopia.Repositories.PlayerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class CrownService {

    @Autowired
    private CrownRepository crownRepository;

    @Autowired
    private PlayerRepository playerRepository;

    public Crown createCrown(CrownDto crownDto) {
        Player player = playerRepository.findById(crownDto.getPlayer_id())
                .orElseThrow(() -> new RuntimeException("Player not found"));
        Optional<Crown> existingCrownOpt = crownRepository.findByPlayer(player);

        Crown crown;
        if (existingCrownOpt.isPresent()) {
            crown = existingCrownOpt.get();
            crown.setQuantity(crown.getQuantity() + crownDto.getQuantity());
        } else {
            crown = new Crown();
            crown.setPlayer(player);
            crown.setQuantity(crownDto.getQuantity());
        }
        return crownRepository.save(crown);
    }

    public CrownDto getCrownDtoByPlayerId(UUID playerId) {
        Player player = playerRepository.findById(playerId)
                .orElseThrow(() -> new RuntimeException("Player not found"));
        Optional<Crown> crownOpt = crownRepository.findByPlayer(player);
        return crownOpt.map(CrownDto::new).orElse(new CrownDto(null, playerId, 0));
    }

    public CrownDto getCrown() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Player player = playerRepository.findByUserUsername(username)
                .orElseThrow(() -> new CustomException("Joueur introuvable", HttpStatus.NOT_FOUND));

        Optional<Crown> crownOpt = crownRepository.findByPlayer(player);
        return crownOpt.map(CrownDto::new).orElse(new CrownDto(null, player.getId(), 0));
    }

    public ResponseEntity<?> minusCrowns(int amount) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Player player = playerRepository.findByUserUsername(username)
                .orElseThrow(() -> new CustomException("Joueur introuvable", HttpStatus.NOT_FOUND));

        Optional<Crown> crownOpt = crownRepository.findByPlayer(player);
        if (crownOpt.isEmpty() || crownOpt.get().getQuantity() < amount) {
            throw new CustomException("Pas assez de couronnes", HttpStatus.BAD_REQUEST);
        }

        Crown crown = crownOpt.get();
        crown.setQuantity(crown.getQuantity() - amount);
        crownRepository.save(crown);

        return ResponseEntity.ok(new CrownDto(crown));
    }
}
