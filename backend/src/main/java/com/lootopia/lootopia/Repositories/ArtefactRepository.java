package com.lootopia.lootopia.Repositories;

import com.lootopia.lootopia.Entities.Artefact;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ArtefactRepository extends JpaRepository<Artefact, UUID> {
}