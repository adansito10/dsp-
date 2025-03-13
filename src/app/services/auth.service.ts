import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = {
    admin: { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    user: { email: 'user@example.com', password: 'user123', role: 'user' }
  };
  // Cambiar el tipo para permitir email como string | null
  private currentUserSubject = new BehaviorSubject<{ email: string | null; role: string | null }>({ email: null, role: null });
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): boolean {
    const user = Object.values(this.users).find(u => u.email === email && u.password === password);
    if (user) {
      const userData = { email, role: user.role };
      localStorage.setItem('currentUser', JSON.stringify(userData));
      this.currentUserSubject.next(userData);
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value.email;
  }

  getRole(): string | null {
    return this.currentUserSubject.value.role;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next({ email: null, role: null });
  }
}