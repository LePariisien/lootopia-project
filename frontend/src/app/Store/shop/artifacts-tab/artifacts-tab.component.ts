import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArtifactCardComponent } from './artifact-card.component';
import { CommonModule } from '@angular/common';
import { Artifact } from '../../../models/artifact.model';
import { LucideAngularModule, Star, Gem, Sparkles, Crown, Minus, Equal } from 'lucide-angular';
import { AuthService } from '../../../services/auth.service';
import { Alert } from '../../../models/alert.model';
import { AlertComponent } from "../../../components/alert/alert.component";
import { ShopService } from '../../../services/shop.service';
import { ArtifactService } from '../../../services/artifact.service';
import { PlayerArtifactService } from '../../../services/playerArtifact.service';
import { PlayerService } from '../../../services/player.service';
import { PlayerArtifact } from '../../../models/player-artifact.model';

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

  constructor(
    private authService: AuthService,
    private shopService: ShopService,
    private artefactService: ArtifactService,
    private playerArtifactService: PlayerArtifactService,
    private playerService: PlayerService
  ) {}

  commonArtifacts: Artifact[] = [];
  rareArtifacts: Artifact[] = [];
  epicArtifacts: Artifact[] = [];
  legendaryArtifacts: Artifact[] = [];

  ngOnInit() {
    this.artefactService.getArtefactsAllOrdered().subscribe({
      next: (artefacts) => {
        this.commonArtifacts = artefacts.commonArtifacts;
        this.rareArtifacts = artefacts.rareArtifacts;
        this.epicArtifacts = artefacts.epicArtifacts;
        this.legendaryArtifacts = artefacts.legendaryArtifacts;
      },
      error: (err) => {
        console.error('Erreur Artefact API:', err);
      }
    });

    this.statusArtifact();
  }

  statusArtifact(): void {
    this.playerService.getArtefacts().subscribe({
      next: (artefacts) => {
        artefacts.forEach((artefact: PlayerArtifact) => {
          this.commonArtifacts.filter(a => a.id === artefact.artefactId).forEach(a => a.isOwned = true);
          this.rareArtifacts.filter(a => a.id === artefact.artefactId).forEach(a => a.isOwned = true);
          this.epicArtifacts.filter(a => a.id === artefact.artefactId).forEach(a => a.isOwned = true);
          this.legendaryArtifacts.filter(a => a.id === artefact.artefactId).forEach(a => a.isOwned = true);
        });
      },
      error: (err) => {
        console.error('Erreur Artefact API:', err);
      }
    });
  }

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
    if (artifact.isOwned) {
      this.setAlert({ type: 'info', message: `Vous possédez déjà l'artefact : ${artifact.name}.` });
      return;
    }
    if (this.crownCount < artifact.price) {
      this.setAlert({ type: 'error', message: 'Vous n\'avez pas assez de couronnes pour acheter cet artefact.' });
      return;
    }

    this.selectedArtifact = artifact;
    this.openModal();
  }

  confirmPurchase(artifact: Artifact) {
    if (!this.authService.isAuthenticated()) {
      this.setAlert({ type: 'warning', message: 'Veuillez vous connecter pour acheter des artefacts.' });
      return;
    }

    this.shopService.minusCrownsByToken(artifact.price).subscribe({
      next: () => {

        this.playerArtifactService.createPlayerArtifact(artifact.id).subscribe({
          next: () => {
            this.crownCount -= artifact.price;
            this.crownCountChange.emit(this.crownCount);
            this.setAlert({ type: 'success', message: `Achat réussi : ${artifact.name} pour ${artifact.price} couronnes.` });

            this.statusArtifact();
          },
          error: (error) => {
            this.setAlert({ type: 'error', message: `Erreur lors de l'achat : ${error.message}` });
          }
        });

      },
      error: (error) => {
        this.setAlert({ type: 'error', message: `Erreur lors de l'achat : ${error.message}` });
      }
    });

    this.closeModal();
  }

  cancelPurchase() {
    this.closeModal();
  }

  openModal() {
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showModal = false;
    this.selectedArtifact = null;
    document.body.style.overflow = '';
  }

  setAlert(alert: Alert) {
    this.alert = alert;
    setTimeout(() => {
      this.alert = { type: 'success', message: '' };
    }, 4000);
  }

}
