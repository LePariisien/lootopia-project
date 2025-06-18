import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArtifactCardComponent } from './artifact-card.component';
import { CommonModule } from '@angular/common';
import { Artifact } from '../../../models/artifact.model';
import { LucideAngularModule, Star, Gem, Sparkles, Crown, Minus, Equal } from 'lucide-angular';
import { AuthService } from '../../../services/auth.service';
import { Alert } from '../../../models/alert.model';
import { AlertComponent } from "../../../components/alert/alert.component";
import { ShopService } from '../../../services/shop.service';

@Component({
  selector: 'app-artifacts-tab',
  templateUrl: './artifacts-tab.component.html',
  styleUrls: ['./artifacts-tab.component.css'],
  imports: [
    CommonModule,
    ArtifactCardComponent,
    LucideAngularModule,
    AlertComponent
  ]
})
export class ArtifactsTabComponent {
  readonly Star = Star;
  readonly Gem = Gem;
  readonly Sparkles = Sparkles;
  readonly Crown = Crown;
  readonly Minus = Minus;
  readonly Equal = Equal;

  @Input() crownCount!: number;

  @Output() crownCountChange = new EventEmitter<number>();

  selectedTab: 'commun' | 'rare' | 'epic' | 'legendary' = 'commun';
  showModal = false;
  selectedArtifact: Artifact | null = null;
  alert: Alert = { type: 'success', message: '' };

  constructor(private authService: AuthService, private shopService: ShopService) {}

  commonArtifacts: Artifact[] = [
    {
      id: 1,
      name: 'Boussole Ancienne',
      description: 'Une boussole qui révèle la direction générale des indices cachés',
      price: 50,
      rarity: 'Commun',
      rarityColor: '#9CA3AF',
      effect: '+10% de chance de trouver des indices',
      image: '/assets/images/artifacts/artifact-5.png',
    },
    {
      id: 2,
      name: 'Carte Parchemin',
      description: 'Un vieux parchemin qui dévoile des zones d\'intérêt sur la carte',
      price: 75,
      rarity: 'Commun',
      rarityColor: '#9CA3AF',
      effect: 'Révèle 1 zone d\'intérêt par chasse',
      image: '/assets/images/artifacts/artifact-4.png',
    },
  ];

  rareArtifacts: Artifact[] = [
    {
      id: 3,
      name: 'Loupe de Détective',
      description: 'Une loupe magique qui révèle des détails cachés dans les énigmes',
      price: 150,
      rarity: 'Rare',
      rarityColor: '#3B82F6',
      effect: '+25% de chance de résoudre les énigmes',
      image: '/assets/images/artifacts/artifact-3.png',
    },
    {
      id: 4,
      name: 'Clé Universelle',
      description: 'Une clé mystérieuse qui peut débloquer certains indices premium',
      price: 200,
      rarity: 'Rare',
      rarityColor: '#3B82F6',
      effect: 'Débloque 1 indice premium gratuit',
      image: '/assets/images/artifacts/artifact-2.png',
    },
  ];

  epicArtifacts: Artifact[] = [
    {
      id: 5,
      name: 'Cristal de Vision',
      description: 'Un cristal qui permet de voir à travers les illusions et fausses pistes',
      price: 400,
      rarity: 'Épique',
      rarityColor: '#8B5CF6',
      effect: 'Élimine les fausses pistes automatiquement',
      image: '/assets/images/artifacts/artifact-1.png',
    }
  ];

  legendaryArtifacts: Artifact[] = [
    {
      id: 7,
      name: 'Couronne des Anciens',
      description: 'La couronne légendaire des premiers chasseurs de trésors',
      price: 1000,
      rarity: 'Légendaire',
      rarityColor: '#F59E0B',
      effect: 'Double les couronnes gagnées pendant 24h',
      image: '/assets/images/artifacts/artifact-6.png',
    },
    {
      id: 8,
      name: 'Œil d\'Horus',
      description: 'L\'artefact ultime qui révèle tous les secrets d\'une chasse',
      price: 1500,
      rarity: 'Légendaire',
      rarityColor: '#F59E0B',
      effect: 'Révèle toutes les solutions d\'une chasse',
      image: '/assets/images/artifacts/artifact-7.png',
    },
  ];

  getRarityIcon(rarity: string): string {
    switch (rarity) {
      case 'Commun':
        return 'star';
      case 'Rare':
        return 'gem';
      case 'Épique':
        return 'sparkles';
      case 'Légendaire':
        return 'crown';
      default:
        return 'star';
    }
  }

  buyArtifact(artifact: Artifact) {
    if (!this.authService.isAuthenticated()) {
      this.setAlert({ type: 'warning', message: 'Veuillez vous connecter pour acheter des artefacts.' });
      return;
    }
    if (this.crownCount < artifact.price) {
      this.setAlert({ type: 'error', message: 'Vous n\'avez pas assez de couronnes pour acheter cet artefact.' });
      return;
    }

    this.selectedArtifact = artifact;
    this.showModal = true;
  }

  confirmPurchase(artifact: Artifact) {
    if (!this.authService.isAuthenticated()) {
      this.setAlert({ type: 'warning', message: 'Veuillez vous connecter pour acheter des artefacts.' });
      return;
    }

    this.shopService.minusCrownsByToken(artifact.price).subscribe({
      next: (response) => {
        this.crownCount -= artifact.price;
        this.crownCountChange.emit(this.crownCount);
        this.setAlert({ type: 'success', message: `Achat réussi : ${artifact.name} pour ${artifact.price} couronnes.` });
      },
      error: (error) => {
        this.setAlert({ type: 'error', message: `Erreur lors de l'achat : ${error.message}` });
      }
    });

    this.showModal = false;
    this.selectedArtifact = null;
  }

  cancelPurchase() {
    this.showModal = false;
    this.selectedArtifact = null;
  }

  setAlert(alert: Alert) {
    this.alert = alert;
    setTimeout(() => {
      this.alert = { type: 'success', message: '' };
    }, 4000);
  }

}
