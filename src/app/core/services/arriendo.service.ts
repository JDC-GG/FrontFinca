// src/app/core/services/arriendo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { arriendo } from '../../models/arriendo.model';

@Injectable({
  providedIn: 'root'
})
export class ArriendoService {
  private apiUrl = `${environment.apiUrl}/solicitudes`;

  constructor(private http: HttpClient) { }

  getArriendos(): Observable<arriendo[]> {
    return this.http.get<arriendo[]>(this.apiUrl);
  }

  getArriendo(id: number): Observable<arriendo> {
    return this.http.get<arriendo>(`${this.apiUrl}/${id}`);
  }

  createArriendo(arriendo: arriendo): Observable<arriendo> {
    return this.http.post<arriendo>(this.apiUrl, arriendo);
  }

  updateArriendo(id: number, arriendo: arriendo): Observable<arriendo> {
    return this.http.put<arriendo>(`${this.apiUrl}/${id}`, arriendo);
  }

  deleteArriendo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getArriendosPorPropiedad(propiedadId: number): Observable<arriendo[]> {
    return this.http.get<arriendo[]>(`${this.apiUrl}/propiedad/${propiedadId}`);
  }

  getArriendosPorUsuario(usuarioId: number): Observable<arriendo[]> {
    return this.http.get<arriendo[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }
}