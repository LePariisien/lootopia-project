package com.lootopia.lootopia.Repositories;

import com.lootopia.lootopia.Entities.Participation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ParticipationRepository extends JpaRepository<Participation, UUID> {
}