import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { arriendo } from '../../models/arriendo.model';

@Injectable({
  providedIn: 'root'
})
export class ArriendoService {

  private apiUrl = `${environment.apiUrl}/solicitud`; // Endpoint base para solicitudes

  constructor(private http: HttpClient) {}

  // Crear nueva solicitud de arriendo
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

  // Obtener solicitudes del usuario autenticado
  getMisArriendos(): Observable<arriendo[]> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<arriendo[]>(`${this.apiUrl}/mis-solicitudes`, { headers });
  }

  // Obtener todas las solicitudes (opcional)
  getArriendos(): Observable<arriendo[]> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<arriendo[]>(this.apiUrl, { headers });
  }

  // Obtener solicitud individual por ID
  getArriendo(id: number): Observable<arriendo> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<arriendo>(`${this.apiUrl}/${id}`, { headers });
  }

  // Actualizar una solicitud existente
  updateArriendo(id: number, cambios: Partial<arriendo>): Observable<arriendo> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<arriendo>(`${this.apiUrl}/${id}`, cambios, { headers });
  }

  // Eliminar una solicitud
  deleteArriendo(id: number): Observable<void> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  // Obtener solicitudes recibidas por el dueño de propiedades
  getSolicitudesRecibidas(idDueno: number): Observable<arriendo[]> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<arriendo[]>(`${this.apiUrl}/dueno/${idDueno}`, { headers });
  }

  // Aceptar solicitud
  aceptarSolicitud(id: number): Observable<arriendo> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<arriendo>(`${this.apiUrl}/${id}/aceptar`, {}, { headers });
  }

  // Rechazar solicitud
  rechazarSolicitud(id: number): Observable<arriendo> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<arriendo>(`${this.apiUrl}/${id}/rechazar`, {}, { headers });
  }
}
