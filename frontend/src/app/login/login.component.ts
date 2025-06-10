import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  mfaCode = '';
  showMfa = false;
  errorMessage = '';

  constructor(private auth: AuthService) {}

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: (response) => {
        this.auth.setTokens(response.accessToken, response.refreshToken, true);
        // this.showMfa = true;
      },
      error: () => {
        this.errorMessage = 'Identifiants incorrects';
      },
    });
  }

  verifyMfa() {
    this.auth.verifyMfa(this.username, this.mfaCode).subscribe({
      next: (response) => {
        this.auth.setTokens(response.accessToken, response.refreshToken, true);
      },
      error: () => {
        this.errorMessage = 'Code MFA invalide';
      },
    });
  }
}
