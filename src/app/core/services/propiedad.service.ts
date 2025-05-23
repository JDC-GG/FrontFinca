import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Propiedad } from '../../models/propiedad.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {
  private apiUrl = `${environment.apiUrl}/propiedad`;

  constructor(private http: HttpClient) {}

  getPropiedades(): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(this.apiUrl);
  }

  getPropiedad(id: number): Observable<Propiedad> {
    return this.http.get<Propiedad>(`${this.apiUrl}/${id}`);
  }

  createPropiedad(propiedad: Propiedad): Observable<Propiedad> {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.post<Propiedad>(this.apiUrl, propiedad, { headers });
}


  updatePropiedad(id: number, propiedad: Propiedad): Observable<Propiedad> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<Propiedad>(`${this.apiUrl}/${id}`, propiedad, { headers });
  }

  deletePropiedad(id: number): Observable<void> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
