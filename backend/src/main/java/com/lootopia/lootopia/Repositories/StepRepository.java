package com.lootopia.lootopia.Repositories;

import com.lootopia.lootopia.Entities.Step;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface StepRepository extends JpaRepository<Step, UUID> {
}