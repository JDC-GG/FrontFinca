import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArriendoService } from '../../core/services/arriendo.service';
import { arriendo } from '../../models/arriendo.model';

@Component({
  standalone: true,
  selector: 'app-solicitudes-recibidas',
  imports: [CommonModule],
  templateUrl: './solicitudes-recibidas.component.html',
  styleUrls: ['./solicitudes-recibidas.component.css']
})
export class SolicitudesRecibidasComponent implements OnInit {
  solicitudes: arriendo[] = [];

  constructor(private arriendoService: ArriendoService) {}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const idDueno = usuario?.id;

    if (!idDueno) {
      console.error('No se encontró el ID del arrendador.');
      return;
    }

    this.arriendoService.getSolicitudesRecibidas(idDueno).subscribe({
      next: (data: arriendo[]) => {
        this.solicitudes = data;
      },
      error: (err) => {
        console.error('Error cargando solicitudes recibidas:', err);
      }
    });
  }

  aceptar(id?: number) {
    if (id === undefined) return;
    this.arriendoService.aceptarSolicitud(id).subscribe(() => {
      this.actualizarEstado(id, 'ACEPTADA');
    });
  }

  rechazar(id?: number) {
    if (id === undefined) return;
    this.arriendoService.rechazarSolicitud(id).subscribe(() => {
      this.actualizarEstado(id, 'RECHAZADA');
    });
  }

  private actualizarEstado(id: number, nuevoEstado: string) {
    const solicitud = this.solicitudes.find(s => s.id === id);
    if (solicitud) {
      solicitud.estado = nuevoEstado;
    }
  }
}
