// src/app/core/services/arriendo.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { arriendo } from '../../models/arriendo.model';

@Injectable({
  providedIn: 'root'
})
export class ArriendoService {

  // La URL base ya apunta a /solicitud-arriendo
  private apiUrl = `${environment.apiUrl}/solicitud-arriendo`;

  constructor(private http: HttpClient) { }

  // Crear nueva solicitud
  createArriendo(dto: {
    propiedadId: number;
    fechaLlegada: string;
    fechaSalida: string;
    cantidadPersonas: number;
  }): Observable<arriendo> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<arriendo>(this.apiUrl, dto, { headers });
  }

  // Obtener solo las solicitudes del usuario logueado
  getMisArriendos(): Observable<arriendo[]> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Aquí va GET /solicitud-arriendo/mis-solicitudes
    return this.http.get<arriendo[]>(`${this.apiUrl}/mis-solicitudes`, { headers });
  }

  // (Opcional: si necesitas en otra pantalla “todas” las solicitudes)
  getArriendos(): Observable<arriendo[]> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<arriendo[]>(this.apiUrl, { headers });
  }

  // (Y el resto de métodos, si los necesitas:)
  getArriendo(id: number): Observable<arriendo> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<arriendo>(`${this.apiUrl}/${id}`, { headers });
  }

  updateArriendo(id: number, cambios: Partial<arriendo>): Observable<arriendo> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<arriendo>(`${this.apiUrl}/${id}`, cambios, { headers });
  }

  deleteArriendo(id: number): Observable<void> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
