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

  // Listar solicitudes del arrendatario actual
  getMisArriendos(): Observable<arriendo[]> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<arriendo[]>(`${this.apiUrl}/mis-solicitudes`, { headers });
  }

  // Aceptar (propietario)
  aceptarSolicitud(id: number): Observable<arriendo> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<arriendo>(`${this.apiUrl}/${id}/aceptar`, {}, { headers });
  }

  // Rechazar (propietario)
  rechazarSolicitud(id: number): Observable<arriendo> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<arriendo>(`${this.apiUrl}/${id}/rechazar`, {}, { headers });
  }

  // Marcar como pagada (arrendatario tras confirmar pago)
  pagarSolicitud(id: number): Observable<arriendo> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<arriendo>(`${this.apiUrl}/${id}/pagar`, {}, { headers });
  }

  // (Opcional) si necesitas listar “recibidas por el dueño”:
  getSolicitudesRecibidas(idDueno: number): Observable<arriendo[]> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<arriendo[]>(`${this.apiUrl}/dueno/${idDueno}`, { headers });
  }


  /**
   * Obtener los datos de UNA solicitud de arriendo por su ID.
   * Esto se usará en el componente de pago para mostrar valor, estado, etc.
   */
  getArriendoById(id: number): Observable<arriendo> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Asume que el backend expone GET /solicitud-arriendo/{id}
    return this.http.get<arriendo>(`${this.apiUrl}/${id}`, { headers });
  }

  /**
   * Realizar pago: recibe un objeto con los datos de pago (id, banco, cuenta, valor).
   * Por ahora internamente solo invoca pagarSolicitud(id), que es PUT /{id}/pagar.
   * Si más adelante tu backend aceptara banco+cuenta, cambiarías esta lógica.
   */
  realizarPago(pagoData: {
    solicitudId: number;
    banco: string;
    numeroCuenta: string;
    valor: number;
  }): Observable<arriendo> {
    // Extraemos el ID de la solicitud
    const id = pagoData.solicitudId;

    // --- Opcional: podrías enviar el banco y el numeroCuenta en el body,
    //     si tu backend empieza a aceptar ese payload.
    //     Por ejemplo:
    //     return this.http.post<arriendo>(
    //       `${this.apiUrl}/${id}/pago-completo`,
    //       { banco: pagoData.banco, numeroCuenta: pagoData.numeroCuenta, valor: pagoData.valor },
    //       { headers }
    //     );

    // Por ahora, llamamos al endpoint existente que marca la solicitud como PENDIENTE_PAGO→ACEPTADA:
    return this.pagarSolicitud(id);
  }
}
