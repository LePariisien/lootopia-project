import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/userProfile.service';
import { AuthService } from '../../services/auth.service';
import { UserProfile } from '../../models/user-profile.model';
import { Player } from '../../models/player.model';
import { PlayerService } from '../../services/player.service';
import { ShopService } from '../../services/shop.service';
import { Artefact } from '../../models/artefact.model';
import { ArtefactService } from '../../services/artefact.service';
import { Crown, Gem, LucideAngularModule, LucideIconData, ShoppingCart, Sparkles, Star, Edit, CircleX } from 'lucide-angular';

@Component({
  selector: 'app-profil-page',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {
  readonly ShoppingCart = ShoppingCart;
  readonly Crown = Crown;
  readonly Star = Star;
  readonly Gem = Gem;
  readonly Sparkles = Sparkles;
  readonly Edit = Edit;
  readonly CircleX = CircleX;

  player: Player | null = null;
  profile: UserProfile | null = null;
  crownCount: number = 0;
  slots = Array(9);
  artefacts: (Artefact | undefined)[] = new Array(9).fill(undefined);

  showEditPopup = false;
  editData = {country: '', bio: '' };

  connectedPlayerId: string | null = null;

  purchases: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private playerService: PlayerService,
    private router: Router,
    private shopService: ShopService,
    private artefactService: ArtefactService
  ) {  }

  getArtefact(artefactId: string): Artefact {
    if (artefactId) {
    }

    return {} as Artefact;
  }

  ngOnInit(): void {
    const token = this.authService.getTokenOrRedirect() ?? '';
    if (!token) return;

    this.route.paramMap.subscribe(params => {
      const nickname = params.get('nickname') || '';
      if (nickname) {
        this.playerService.getPlayerByNickname(nickname).subscribe({
          next: (data) => {
            this.player = data;

            this.userService.getUserProfileByPlayerId(data?.id).subscribe({
              next: (data) => {
                this.profile = data;
              },
              error: (err) => {
                console.error('Erreur de récupération du profil:', err);
                this.router.navigate(['/404']);
              }
            });

            this.shopService.getCrownQuantity().subscribe({
              next: (crown) => {
                this.crownCount = crown.quantity;
              },
              error: (err) => {
                console.error('Erreur Crown API:', err);
              }
            });

            this.playerService.getArtefactsByPlayerId(data?.id).subscribe({
              next: (artefacts) => {
                let artefactsArray: Artefact[] = [];
                artefacts.forEach((artefact) => {

                  const artefactId = artefact.artefactId;
                  this.artefactService.getArtefactById(artefactId).subscribe({
                    next: (artefact) => {
                      artefactsArray.push(artefact);
                    },
                    error: (err) => {
                      console.error('Erreur de récupération de l\'artefact:', err);
                    }
                  });

                });
                this.artefacts = artefactsArray;
              },
              error: (err) => {
                console.error('Erreur de récupération des artefacts:', err);
              }
            });

            this.shopService.getPurchasesByPlayerId(data?.id).subscribe({
              next: (purchases) => {
                console.log('Achats récupérés:', purchases);
                this.purchases = Array.isArray(purchases) ? purchases : [purchases];
              },
              error: (err) => {
                console.error('Erreur lors de la récupération des achats:', err);
              }
            });

          },
          error: (err) => {
            console.error('Erreur de récupération du profil:', err);
            this.router.navigate(['/404']);
          }
        });
      }
    });
    this.connectedPlayerId = this.authService.getPlayerId();
  }

  getRarityIcon(rarity: string): LucideIconData {
    switch (rarity) {
      case 'Commun':
        return this.Star;
      case 'Rare':
        return this.Gem;
      case 'Épique':
        return this.Sparkles;
      case 'Légendaire':
        return this.Crown;
      default:
        return this.Star;
    }
  }

  openEditProfile() {
    if (this.player) {
      this.editData.country = this.player.country ?? '';
      this.editData.bio = this.player.bio ?? '';
      this.showEditPopup = true;
    }
  }

  closeEditProfile() {
    this.showEditPopup = false;
  }

  saveProfile() {
    if (!this.player) return;
    const updated = {
      ...this.player,
      country: this.editData.country,
      bio: this.editData.bio
    };
    this.playerService.updatePlayer(this.player.id, updated).subscribe({
      next: () => {
        // Mets à jour l'affichage local
        this.player = { ...this.player!, ...this.editData };
        this.closeEditProfile();
      },
      error: (err) => {
        alert("Erreur lors de la sauvegarde du profil");
        console.error(err);
      }
    });
  }
}
