package com.lootopia.lootopia.Repositories;

import com.lootopia.lootopia.Entities.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface InvitationRepository extends JpaRepository<Invitation, UUID> {
}