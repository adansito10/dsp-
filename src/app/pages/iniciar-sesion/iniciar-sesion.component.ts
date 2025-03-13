import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: false,
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Verifica el estado de autenticación al iniciar
    console.log('Estado de autenticación al iniciar:', this.authService.isLoggedIn());
    console.log('Usuario en localStorage:', localStorage.getItem('currentUser'));

    // Verificación continua para el botón "atrás"
    setInterval(() => {
      if (this.authService.isLoggedIn()) {
        const role = this.authService.getRole();
        this.router.navigate([role === 'admin' ? '/panel/admin' : '/panel/user'])
          .then(() => console.log('Redirigido por intervalo'))
          .catch(err => console.error('Error en redirección por intervalo:', err));
      }
    }, 100); // Verifica cada 100ms (ajusta según necesites)
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;

      console.log('Intentando login con:', { email, password });

      if (this.authService.login(email, password)) {
        const role = this.authService.getRole();
        console.log('Rol detectado:', role);
        if (role === 'admin') {
          this.router.navigate(['/panel/admin'])
            .then(() => console.log('Redirigido a panel/admin'))
            .catch(err => console.error('Error en redirección a admin:', err));
        } else if (role === 'user') {
          this.router.navigate(['/panel/user'])
            .then(() => console.log('Redirigido a panel/user'))
            .catch(err => console.error('Error en redirección a user:', err));
        } else {
          this.errorMessage = 'Rol no reconocido.';
        }
      } else {
        this.errorMessage = 'Correo o contraseña incorrectos.';
      }
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}