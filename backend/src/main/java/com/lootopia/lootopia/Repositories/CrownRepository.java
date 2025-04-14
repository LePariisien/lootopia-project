package com.lootopia.lootopia.Repositories;

import com.lootopia.lootopia.Entities.Crown;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface CrownRepository extends JpaRepository<Crown, UUID> {
}