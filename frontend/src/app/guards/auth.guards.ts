import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('accessToken');
    const emailVerified = localStorage.getItem('emailVerified') === 'true';

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!emailVerified) {
      this.router.navigate(['/verify-email']); 
      return false;
    }

    return true;
  }
}
