import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  mfaCode: string = ''; // requis si MFA activé côté backend
  errorMessage: string = '';
  showPassword: boolean = false;
  showMfa: boolean = false;

  constructor(private auth: AuthService) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.accessToken && response.refreshToken) {
          this.auth.setTokens(response.accessToken, response.refreshToken, response.emailVerified, true);
        } else if (response.mfaRequired) {
          this.showMfa = true;
        }
      }
    });
  }

  verifyMfa() {
    this.auth.verifyMfa(this.email, this.mfaCode).subscribe({
      next: (response) => {
        this.auth.setTokens(response.accessToken, response.refreshToken, response.emailVerified, true);
      },
      error: () => {
        this.errorMessage = 'Code MFA invalide';
      },
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
