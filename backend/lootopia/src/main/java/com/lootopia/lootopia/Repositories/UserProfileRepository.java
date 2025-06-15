package com.lootopia.lootopia.Repositories;

import com.lootopia.lootopia.Entities.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserProfileRepository extends JpaRepository<UserProfile, UUID> {

    UserProfile findByPlayerId(UUID id);

}
