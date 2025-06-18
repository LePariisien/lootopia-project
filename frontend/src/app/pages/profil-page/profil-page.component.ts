import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/userProfile.service';
import { AuthService } from '../../services/auth.service';
import { UserProfile } from '../../models/user-profile.model';
import { Player } from '../../models/player.model';
import { PlayerService } from '../../services/player.service';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-profil-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {
  player: Player | null = null;
  profile: UserProfile | null = null;
  crownCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private playerService: PlayerService,
    private router: Router,
    private shopService: ShopService
  ) {  }

  ngOnInit(): void {
    const token = this.authService.getTokenOrRedirect() ?? '';
    if (!token) return;

    this.route.paramMap.subscribe(params => {
      const nickname = params.get('nickname') || '';
      if (nickname) {
        this.playerService.getPlayerByNickname(nickname).subscribe({
          next: (data) => {
            this.player = data;
            console.log('Player data:', this.player);

            this.userService.getUserProfileByPlayerId(data?.id).subscribe({
              next: (data) => {
                this.profile = data;
                console.log('User profile data:', this.profile);
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

          },
          error: (err) => {
            console.error('Erreur de récupération du profil:', err);
            this.router.navigate(['/404']);
          }
        });
      }
    });
  }
}
