package com.lootopia.lootopia.Repositories;

import com.lootopia.lootopia.Entities.Statistic;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface StatisticRepository extends JpaRepository<Statistic, UUID> {
}