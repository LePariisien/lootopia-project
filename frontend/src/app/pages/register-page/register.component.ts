import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  message: string = '';
  error: string = '';

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
    }, window.location.origin).subscribe({
      next: (res) => {
        console.log("Réponse reçue :", res);
        this.message = "Compte créé avec succès. Veuillez vérifier votre adresse email.";
        setTimeout(() => {
          console.log("⏩ Redirection vers /login");
          this.router.navigate(['/login']);
        }, 4000);
      },
      error: (err) => {
        console.error("Erreur reçue :", err);
        this.error = err?.error?.message || "Erreur lors de l'inscription.";
      }
    });
  }
}
