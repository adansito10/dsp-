import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-capacitacion',
  standalone: false,
  templateUrl: './capacitacion.component.html',
  styleUrl: './capacitacion.component.scss'

})
export class CapacitacionComponent {
 constructor(private router: Router) {}
 
   goToCapacitacion(event: Event): void {
     event.preventDefault(); // Evita el comportamiento nativo del navegador
     this.router.navigate(['/tecnologia'], { fragment: 'programas' })
       .then(() => console.log('Navegación a /capacitacion#demo-interactiva exitosa'))
       .catch(err => console.error('Error en navegación:', err));
   }
 

}