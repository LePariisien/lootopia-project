package com.lootopia.lootopia.Services;

import com.lootopia.lootopia.Dtos.UserProfileDto;
import com.lootopia.lootopia.Entities.Player;
import com.lootopia.lootopia.Entities.User;
import com.lootopia.lootopia.Entities.UserProfile;
import com.lootopia.lootopia.Repositories.PlayerRepository;
import com.lootopia.lootopia.Repositories.UserRepository;
import com.lootopia.lootopia.Repositories.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private PlayerRepository playerRepository;

    // Méthode de base utilisée dans d'autres cas
    public UserProfileDto getProfile(String id) {
        UUID uuid = UUID.fromString(id);

        Optional<User> userOpt = userRepository.findById(uuid);
        Optional<UserProfile> profileOpt = userProfileRepository.findById(uuid);

        if (userOpt.isEmpty() || profileOpt.isEmpty()) {
            return null;
        }

        User user = userOpt.get();
        UserProfile profile = profileOpt.get();

        UserProfileDto dto = new UserProfileDto();
        dto.username = user.getUsername();
        dto.avatarUrl = profile.getAvatarUrl();
        dto.crownBalance = profile.getCrownBalance();
        dto.huntsCompleted = profile.getHuntsCompleted();
        dto.treasuresFound = profile.getTreasuresFound();
        dto.riddlesSolved = profile.getRiddlesSolved();
        dto.badgesWon = profile.getBadgesWon();

        return dto;
    }

    // Nouvelle méthode combinée
    public Map<String, Object> getFullProfile(String id) {
        UUID uuid = UUID.fromString(id);

        UserProfileDto profileDto = getProfile(id);
        Optional<Player> playerOpt = playerRepository.findByUserId(uuid);

        if (profileDto == null || playerOpt.isEmpty()) {
            return null;
        }

        Map<String, Object> result = new HashMap<>();
        result.put("userProfile", profileDto);
        result.put("player", playerOpt.get());

        return result;
    }
}
