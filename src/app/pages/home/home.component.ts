import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToCapacitacion(event: Event): void {
    event.preventDefault(); // Evita el comportamiento nativo del navegador
    this.router.navigate(['/capacitacion'], { fragment: 'demo-interactiva' })
      .then(() => console.log('Navegación a /capacitacion#demo-interactiva exitosa'))
      .catch(err => console.error('Error en navegación:', err));
  }
}
