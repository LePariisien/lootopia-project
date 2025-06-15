import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
  mfaCode: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(private auth: AuthService) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (response) => {
        this.auth.setTokens(response.accessToken, response.refreshToken, true);
        // this.showMfa = true;
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Identifiants invalides. Veuillez réessayer.';
      },
    });
  }

  verifyMfa() {
    this.auth.verifyMfa(this.email, this.mfaCode).subscribe({
      next: (response) => {
        this.auth.setTokens(response.accessToken, response.refreshToken, true);
      },
      error: () => {
        this.errorMessage = 'Code MFA invalide';
      },
    });
  }
}
