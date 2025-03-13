import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  empresa: string = '';
  asunto: string = '';
  interes: string = 'capacitacion'; // Valor predeterminado
  mensaje: string = '';
}