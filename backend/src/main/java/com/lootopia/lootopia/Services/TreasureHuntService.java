package com.lootopia.lootopia.Services;

import com.lootopia.lootopia.Entities.TreasureHunt;
import com.lootopia.lootopia.Entities.User;
import com.lootopia.lootopia.Repositories.TreasureHuntRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TreasureHuntService {

    private final TreasureHuntRepository treasureHuntRepository;

    public List<TreasureHunt> getAllTreasureHunts() {
        return treasureHuntRepository.findAll();
    }

    public TreasureHunt getTreasureHuntById(Long id) {
        return treasureHuntRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Erreur : La chasse au trésor n'existe pas."));
    }

    public String createTreasureHunt(TreasureHunt treasureHunt) {
        treasureHuntRepository.save(treasureHunt);
        return "Succès : La chasse au trésor '" + treasureHunt.getName() + "' a été créée avec succès.";
    }

    public String updateTreasureHunt(Long id, TreasureHunt updatedTreasureHunt) {
        TreasureHunt existingTreasureHunt = getTreasureHuntById(id);

        existingTreasureHunt.setName(updatedTreasureHunt.getName());
        existingTreasureHunt.setDescription(updatedTreasureHunt.getDescription());
        existingTreasureHunt.setLevel(updatedTreasureHunt.getLevel());
        existingTreasureHunt.setLocation(updatedTreasureHunt.getLocation());
        existingTreasureHunt.setStartDate(updatedTreasureHunt.getStartDate());
        existingTreasureHunt.setEndDate(updatedTreasureHunt.getEndDate());
        existingTreasureHunt.setUser(updatedTreasureHunt.getUser());

        treasureHuntRepository.save(existingTreasureHunt);
        return "Succès : La chasse au trésor " + updatedTreasureHunt.getName() + " a été mise à jour avec succès.";
    }

    public String deleteTreasureHunt(Long id) {
        if (!treasureHuntRepository.existsById(id)) {
            throw new EntityNotFoundException("Erreur : La chasse au trésor n'existe pas.");
        }
        treasureHuntRepository.deleteById(id);
        return "Succès : La chasse au trésor a été supprimée avec succès.";
    }

    public List<TreasureHunt> getTreasureHuntsByUser(User user) {
        List<TreasureHunt> userTreasureHunts = treasureHuntRepository.findAll().stream()
                .filter(treasureHunt -> treasureHunt.getUser().equals(user))
                .toList();

        if (userTreasureHunts.isEmpty()) {
            throw new EntityNotFoundException("Erreur : Aucune chasse au trésor trouvée pour l'utilisateur " + user.getUsername() + ".");
        }

        return userTreasureHunts;
    }
}