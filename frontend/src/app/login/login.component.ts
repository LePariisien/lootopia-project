import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.showMfa = true;
      },
      error: () => {
        this.errorMessage = 'Identifiants incorrects';
      },
    });
  }

  verifyMfa() {
    this.auth.verifyMfa(this.username, this.mfaCode).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token); 
        this.router.navigate(['/']);
      },
      error: () => {
        this.errorMessage = 'Code MFA invalide';
      },
    });
  }
}
