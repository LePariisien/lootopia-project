package com.lootopia.lootopia.Services;

import java.util.UUID;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.lootopia.lootopia.Dtos.PlayerArtefactDto;
import com.lootopia.lootopia.Dtos.PlayerDto;
import com.lootopia.lootopia.Entities.Player;
import com.lootopia.lootopia.Entities.User;
import com.lootopia.lootopia.Exceptions.CustomException;
import com.lootopia.lootopia.Repositories.PlayerRepository;
import com.lootopia.lootopia.Repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlayerService {

	@Value("${server.frontend.url}")
	private String defaultAvatarUrl;

	@Autowired
	private PlayerRepository playerRepository;

	@Autowired
	private UserRepository userRepository;

	public ResponseEntity<?> createPlayer() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();

		create(username);
		return ResponseEntity.ok("Le joueur créé avec succès");
	}

	public Player create(String username) {
		User userFind = userRepository.findByUsername(username)
				.orElseThrow(() -> new CustomException("Utilisateur introuvable", HttpStatus.NOT_FOUND));

		String numberUnique = RandomStringUtils.random(4, false, true);
		String nickname = username + "#" + numberUnique;
		if (playerRepository.findByNickname(nickname).isPresent()) {
			throw new CustomException("Ce pseudo est déjà pris", HttpStatus.CONFLICT);
		}

		Player player = new Player();
		player.setUser(userFind);
		player.setNickname(nickname);
		player.setScore(0);
		player.setAvatarUrl(defaultAvatarUrl + "/player_default.png");
		player.setBio("Bienvenue sur Lootopia !\n" +
				"N'hésitez pas à m'en dire plus 😉");
		player.setCountry("FR");

		return playerRepository.save(player);
	}

	public ResponseEntity<?> getPlayer() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();

		Player player = getPlayerByUsername(username);

		return ResponseEntity.ok(new PlayerDto(player));
	}

	public Player getPlayerByUsername(String username) {
		return playerRepository.findByUserUsername(username)
				.orElseThrow(() -> new CustomException("Joueur introuvable", HttpStatus.NOT_FOUND));
	}

	public ResponseEntity<?> getPlayerById(String id) {
		Player player = playerRepository.findById(UUID.fromString(id))
				.orElseThrow(() -> new CustomException("Joueur introuvable", HttpStatus.NOT_FOUND));

		return ResponseEntity.ok(new PlayerDto(player));
	}

	public ResponseEntity<?> getPlayerByNickname(String nickname) {
		Player player = playerRepository.findByNickname(nickname)
				.orElseThrow(() -> new CustomException("Joueur introuvable", HttpStatus.NOT_FOUND));

		return ResponseEntity.ok(new PlayerDto(player));
	}

	public ResponseEntity<?> updatePlayer(PlayerDto playerDto) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();

		Player player = playerRepository.findByUserUsername(username)
				.orElseThrow(() -> new CustomException("Joueur introuvable", HttpStatus.NOT_FOUND));

		player.setAvatarUrl(playerDto.getAvatarUrl());
		player.setBio(playerDto.getBio());
		player.setCountry(playerDto.getCountry());

		playerRepository.save(player);

		return ResponseEntity.ok("Profil mis à jour avec succès");
	}

	public Player getPlayerById(UUID playerId) {
		return playerRepository.findById(playerId)
				.orElseThrow(() -> new EntityNotFoundException("Erreur : Joueur introuvable avec l'ID " + playerId));
	}

	public ResponseEntity<?> getAllPlayers() {
		return ResponseEntity.ok(
				playerRepository.findAll().stream()
						.map(PlayerDto::new)
						.toList());
	}

	public ResponseEntity<?> getPlayerCount() {
		long count = playerRepository.count();
		return ResponseEntity.ok(count);
	}

	public ResponseEntity<?> getPlayerArtefacts() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Player player = getPlayerByUsername(username);

		if (player.getPlayerArtefacts() == null || player.getPlayerArtefacts().isEmpty()) {
			return ResponseEntity.ok("Aucun artefact trouvé pour ce joueur.");
		}

		return ResponseEntity.ok(player.getPlayerArtefacts().stream()
				.map(artefact -> new PlayerArtefactDto(artefact))
				.toList());
	}

	public ResponseEntity<?> getPlayerArtefactsById(String id) {
		Player player = getPlayerById(UUID.fromString(id));

		if (player.getPlayerArtefacts() == null || player.getPlayerArtefacts().isEmpty()) {
			return ResponseEntity.ok("Aucun artefact trouvé pour ce joueur.");
		}

		return ResponseEntity.ok(player.getPlayerArtefacts().stream()
				.map(artefact -> new PlayerArtefactDto(artefact))
				.toList());
	}
}