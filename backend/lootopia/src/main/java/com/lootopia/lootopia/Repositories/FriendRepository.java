package com.lootopia.lootopia.Repositories;

import com.lootopia.lootopia.Entities.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface FriendRepository extends JpaRepository<Friend, UUID> {
}