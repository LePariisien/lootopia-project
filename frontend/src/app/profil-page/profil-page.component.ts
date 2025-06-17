import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../services/userProfile.service';
import { AuthService } from '../services/auth.service';
import { UserProfile, Player } from '../models/user-profile.model';

@Component({
  selector: 'app-profil-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {
  userProfile: UserProfile | null = null;
  player: Player | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.userService.getProfile(userId).subscribe({
      next: (data) => {
        this.userProfile = data.userProfile;
        this.player = data.player;
      },
      error: (err) => {
        console.error('Erreur de récupération du profil:', err);
        this.router.navigate(['/login']);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
