import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const expectedRole = route.data['expectedRole'];
    const redirectIfAuthenticated = route.data['redirectIfAuthenticated'];
    const currentUrl = state.url;

    console.log('AuthGuard - Current URL:', currentUrl);
    console.log('AuthGuard - isLoggedIn:', isLoggedIn);
    console.log('AuthGuard - Route data:', route.data);

    if (isLoggedIn && redirectIfAuthenticated && currentUrl === '/iniciar-sesion') {
      console.log('Usuario autenticado, redirigiendo desde /iniciar-sesion');
      const role = this.authService.getRole();
      this.router.navigate([role === 'admin' ? '/panel/admin' : '/panel/user'])
        .then(() => console.log('Redirección exitosa'))
        .catch(err => console.error('Error en redirección:', err));
      return false;
    }

    if (!isLoggedIn && !redirectIfAuthenticated) {
      console.log('Usuario no autenticado, redirigiendo a /iniciar-sesion');
      this.router.navigate(['/iniciar-sesion']);
      return false;
    }

    if (expectedRole && this.authService.getRole() !== expectedRole) {
      console.log('Rol no coincide, redirigiendo');
      this.router.navigate([this.authService.getRole() === 'admin' ? '/panel/admin' : '/panel/user']);
      return false;
    }

    console.log('Acceso permitido');
    return true;
  }
}