import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  mfaCode: string = ''; // requis si MFA activé côté backend
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    this.authService.login(this.email, this.password, this.mfaCode).subscribe({
      next: (response) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('emailVerified', String(response.emailVerified));
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Identifiants invalides. Veuillez réessayer.';
      },
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
