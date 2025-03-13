import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-panel-user',
  standalone: false,
  templateUrl: './panel-user.component.html',
  styleUrl: './panel-user.component.scss'
})
export class PanelUserComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/iniciar-sesion']);
  }

}
