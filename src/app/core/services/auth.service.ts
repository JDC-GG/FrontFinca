// auth.service.ts
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { tap } from 'rxjs';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private api: ApiService) { }

  login(email: string, password: string) {
    return this.api.post<{token: string}>('auth/login', {email, password})
      .pipe(tap(res => localStorage.setItem('token', res.token)));
  }

  register(usuario: Usuario) {
    return this.api.post<Usuario>('usuarios', usuario);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}