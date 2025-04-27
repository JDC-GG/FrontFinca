// src/app/core/services/usuario.service.ts
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { ApiService } from './api.service';
import { Usuario } from '../../models/usuario.model';
import { Observable } from 'rxjs';
=======
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../models/usuario.model';
>>>>>>> Mafe

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
<<<<<<< HEAD
  constructor(private api: ApiService) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.api.get<Usuario[]>('usuarios'); 
  }

  // Obtener un usuario por su ID
  getUsuario(id: number): Observable<Usuario> {  
    return this.api.get<Usuario>(`usuarios/${id}`);  
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.api.post<Usuario>('usuarios', usuario); 
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.api.delete<void>(`usuarios/${id}`); 
  }
}
=======
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
>>>>>>> Mafe
