package com.lootopia.lootopia.Repositories;

import com.lootopia.lootopia.Entities.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface PurchaseRepository extends JpaRepository<Purchase, UUID> {
}