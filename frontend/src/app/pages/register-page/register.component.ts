import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Alert } from '../../models/alert.model';
import { AlertComponent } from "../../components/alert/alert.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  alert: Alert = { type: 'success', message: '' };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/)
      ]],
      confirmPassword: ['', Validators.required],
      mfaEnabled: [false]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    console.log("🔁 Envoi du formulaire...");
    const { confirmPassword, ...formValue } = this.registerForm.value;

    this.authService.register({
      email: formValue.email,
      password: formValue.password,
      username: formValue.username,
      mfaEnabled: formValue.mfaEnabled
    }).subscribe({
      next: (res) => {
        console.log("Réponse reçue :", res);

        if (!formValue.mfaEnabled) {
          this.setAlert({ type: 'success', message: res.message });
        }

        setTimeout(() => {
          console.log("⏩ Redirection vers /login");
          this.router.navigate(['/login']);
        }, 4000);
      },
      error: (err) => {
        console.error("Erreur reçue :", err);
        this.setAlert({ type: 'error', message: err?.message || "Erreur lors de l'inscription." });
      }
    });
  }

  setAlert(alert: Alert) {
    this.alert = alert;
    setTimeout(() => {
      this.alert = { type: 'success', message: '' };
    }, 4000);
  }
}
