package com.lootopia.lootopia.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lootopia.lootopia.Entities.RevokedTokens;

@Repository
public interface RevokedTokenRepository extends JpaRepository<RevokedTokens, Long> {

    boolean existsByToken(String token);

}