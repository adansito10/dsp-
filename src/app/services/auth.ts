import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.routeConfig?.path === 'admin' ? 'admin' : 'user';
    const currentUser = this.authService.getCurrentUser();

    if (currentUser && currentUser.role === expectedRole) {
      return true;
    } else if (currentUser && currentUser.role) {
      this.router.navigate([`/${currentUser.role}`]);
      return false;
    } else {
      this.router.navigate(['/iniciar-sesion']);
      return false;
    }
  }
}