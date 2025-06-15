import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  imports: [CommonModule]
})
export class VerifyComponent implements OnInit {
  message = '';
  error = '';

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.authService.verifyAccount(code).subscribe({
        next: () => this.message = 'Votre compte a été vérifié avec succès !',
        error: (err) => this.error = err.error.message || 'Erreur lors de la vérification.'
      });
    } else {
      this.error = 'Code de vérification manquant dans l’URL.';
    }
  }
}
