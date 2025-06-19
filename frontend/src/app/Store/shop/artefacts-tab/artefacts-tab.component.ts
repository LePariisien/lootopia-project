import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArtefactCardComponent } from './artefact-card.component';
import { CommonModule } from '@angular/common';
import { Artefact } from '../../../models/artefact.model';
import { LucideAngularModule, Star, Gem, Sparkles, Crown, Minus, Equal } from 'lucide-angular';
import { AuthService } from '../../../services/auth.service';
import { Alert } from '../../../models/alert.model';
import { AlertComponent } from "../../../components/alert/alert.component";
import { ShopService } from '../../../services/shop.service';
import { ArtefactService } from '../../../services/artefact.service';
import { PlayerArtefactService } from '../../../services/playerArtefact.service';
import { PlayerService } from '../../../services/player.service';
import { PlayerArtefact } from '../../../models/player-artefact.model';

@Component({
  selector: 'app-artefacts-tab',
  templateUrl: './artefacts-tab.component.html',
  styleUrls: ['./artefacts-tab.component.css'],
  imports: [
    CommonModule,
    ArtefactCardComponent,
    LucideAngularModule,
    AlertComponent
  ]
})
export class ArtefactsTabComponent {
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
  selectedArtefact: Artefact | null = null;
  alert: Alert = { type: 'success', message: '' };

  constructor(
    private authService: AuthService,
    private shopService: ShopService,
    private artefactService: ArtefactService,
    private playerArtefactService: PlayerArtefactService,
    private playerService: PlayerService
  ) {}

  commonArtefacts: Artefact[] = [];
  rareArtefacts: Artefact[] = [];
  epicArtefacts: Artefact[] = [];
  legendaryArtefacts: Artefact[] = [];

  ngOnInit() {
    this.artefactService.getArtefactsAllOrdered().subscribe({
      next: (artefacts) => {
        this.commonArtefacts = artefacts.commonArtefacts;
        this.rareArtefacts = artefacts.rareArtefacts;
        this.epicArtefacts = artefacts.epicArtefacts;
        this.legendaryArtefacts = artefacts.legendaryArtefacts;
      },
      error: (err) => {
        console.error('Erreur Artefact API:', err);
      }
    });

    this.statusArtefact();
  }

  statusArtefact(): void {
    this.playerService.getArtefacts().subscribe({
      next: (artefacts) => {
        artefacts.forEach((artefact: PlayerArtefact) => {
          this.commonArtefacts.filter(a => a.id === artefact.artefactId).forEach(a => a.isOwned = true);
          this.rareArtefacts.filter(a => a.id === artefact.artefactId).forEach(a => a.isOwned = true);
          this.epicArtefacts.filter(a => a.id === artefact.artefactId).forEach(a => a.isOwned = true);
          this.legendaryArtefacts.filter(a => a.id === artefact.artefactId).forEach(a => a.isOwned = true);
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

  buyArtefact(artefact: Artefact) {
    if (!this.authService.isAuthenticated()) {
      this.setAlert({ type: 'warning', message: 'Veuillez vous connecter pour acheter des artefacts.' });
      return;
    }
    if (artefact.isOwned) {
      this.setAlert({ type: 'info', message: `Vous possédez déjà l'artefact : ${artefact.name}.` });
      return;
    }
    if (this.crownCount < artefact.price) {
      this.setAlert({ type: 'error', message: 'Vous n\'avez pas assez de couronnes pour acheter cet artefact.' });
      return;
    }

    this.selectedArtefact = artefact;
    this.openModal();
  }

  confirmPurchase(artefact: Artefact) {
    if (!this.authService.isAuthenticated()) {
      this.setAlert({ type: 'warning', message: 'Veuillez vous connecter pour acheter des artefacts.' });
      return;
    }

    this.shopService.minusCrownsByToken(artefact.price).subscribe({
      next: () => {

        this.playerArtefactService.createPlayerArtefact(artefact.id).subscribe({
          next: () => {
            this.crownCount -= artefact.price;
            this.crownCountChange.emit(this.crownCount);
            this.setAlert({ type: 'success', message: `Achat réussi : ${artefact.name} pour ${artefact.price} couronnes.` });

            this.statusArtefact();
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
    this.selectedArtefact = null;
    document.body.style.overflow = '';
  }

  setAlert(alert: Alert) {
    this.alert = alert;
    setTimeout(() => {
      this.alert = { type: 'success', message: '' };
    }, 4000);
  }

}
