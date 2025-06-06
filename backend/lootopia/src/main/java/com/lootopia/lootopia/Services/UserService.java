package com.lootopia.lootopia.Services;

import com.lootopia.lootopia.Dtos.UserProfileDto;
import com.lootopia.lootopia.Entities.Player;
import com.lootopia.lootopia.Entities.User;
import com.lootopia.lootopia.Entities.UserProfile;
import com.lootopia.lootopia.Exceptions.CustomException;
import com.lootopia.lootopia.Repositories.UserRepository;
import com.lootopia.lootopia.Repositories.PlayerRepository;
import com.lootopia.lootopia.Repositories.UserProfileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private PlayerRepository playerRepository;

    public UserProfileDto getProfile(String id) {
        UUID uuid = UUID.fromString(id);

        Optional<User> userOpt = userRepository.findById(uuid);
        Optional<UserProfile> profileOpt = userProfileRepository.findById(uuid);

        if (userOpt.isEmpty() || profileOpt.isEmpty()) {
            return null;
        }

        UserProfile profile = profileOpt.get();

        return new UserProfileDto(profile);
    }

    public ResponseEntity<?> getProfileByPlayerId(String id) {
        Player player = playerRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new CustomException("Joueur introuvable", HttpStatus.NOT_FOUND));

        UserProfile profile = userProfileRepository.findByPlayerId(player.getId());
        if (profile == null) {
            throw new CustomException("Profil utilisateur introuvable pour le joueur", HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(new UserProfileDto(profile));
    }

    public ResponseEntity<?> createUserProfile() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        return ResponseEntity.ok(new UserProfileDto(createUserProfile(username)));
    }

    public UserProfile createUserProfile(String nickname) {
        Player player = playerRepository.findByNickname(nickname)
                .orElseThrow(() -> new CustomException("Joueur introuvable", HttpStatus.NOT_FOUND));

        UserProfile userProfile = UserProfile.builder()
                .avatarUrl("http://localhost:4200/assets/images/default/player_default.png")
                .crownBalance(0)
                .huntsCompleted(0)
                .treasuresFound(0)
                .riddlesSolved(0)
                .badgesWon(0)
                .player(player)
                .build();

        userProfileRepository.save(userProfile);

        return userProfile;
    }
}
