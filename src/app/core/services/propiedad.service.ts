// src/app/core/services/propiedad.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Propiedad } from '../../models/propiedad.model';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {
  private apiUrl = `${environment.apiUrl}/propiedades`;

  constructor(private http: HttpClient) { }

  getPropiedades(): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(this.apiUrl);
  }

  getPropiedad(id: number): Observable<Propiedad> {
    return this.http.get<Propiedad>(`${this.apiUrl}/${id}`);
  }

  createPropiedad(propiedad: Propiedad): Observable<Propiedad> {
    return this.http.post<Propiedad>(this.apiUrl, propiedad);
  }

  updatePropiedad(id: number, propiedad: Propiedad): Observable<Propiedad> {
    return this.http.put<Propiedad>(`${this.apiUrl}/${id}`, propiedad);
  }

  deletePropiedad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}