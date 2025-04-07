import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Usuario } from '../../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
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
