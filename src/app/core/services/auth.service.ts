import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Usuario } from '../../models/usuario.model';

interface LoginResponse {
  token: string;
  usuario: Usuario;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  /*constructor(private api: ApiService) {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = this.decodeToken(token);
      if (decoded) {
        const usuario: Partial<Usuario> = {
          id: decoded.id,
          correo: decoded.sub,
          rol: decoded.rol
        };
        this.currentUserSubject.next(usuario as Usuario);
      }
    }
  }*/

  constructor(private api: ApiService) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const usuario: Usuario = JSON.parse(storedUser);
        this.currentUserSubject.next(usuario);
      } catch (err) {
        console.error('Error al parsear currentUser de localStorage', err);
        localStorage.removeItem('currentUser');
      }
    }
  } 

  login(email: string, password: string): Observable<Usuario> {
    return this.api.post<LoginResponse>('usuario/login', { correo: email, contrasena: password })
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('currentUser', JSON.stringify(res.usuario));
          this.currentUserSubject.next(res.usuario);
        }),
        map(res => res.usuario)
      );
  }

  register(usuario: Usuario) {
    return this.api.post<Usuario>('usuario', usuario);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Error al decodificar el token:', e);
      return null;
    }
  }
}
