// src/app/components/arrendador/solicitudes-recibidas/solicitudes-recibidas.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArriendoService } from '../../../core/services/arriendo.service';
import { arriendo } from '../../../models/arriendo.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-solicitudes-recibidas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './solicitudes-recibidas.component.html',
  styleUrls: ['./solicitudes-recibidas.component.css']
})
export class SolicitudesRecibidasComponent implements OnInit {
  // Nombre exactamente igual al que se usará en el HTML:
  solicitudesRecibidas: arriendo[] = [];

  // “cargando” y “errorMsg” para que coincidan con el HTML:
  cargando = true;
  errorMsg: string | null = null;

  constructor(private arriendoService: ArriendoService) {}

  ngOnInit(): void {
    // 1) Leemos el usuario logueado de localStorage
    const usuarioRaw = localStorage.getItem('currentUser');
    const usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null;
    const idDueno = usuario?.id;

    if (idDueno != null) {
      // 2) Llamamos al servicio para traer TODAS las solicitudes de este dueño
      this.arriendoService.getSolicitudesRecibidas(idDueno).subscribe({
        next: (data: arriendo[]) => {
          // Eliminamos cualquier filtro de estado: mostramos todo
          this.solicitudesRecibidas = data
            .slice() // clonar antes de ordenar
            .sort((a, b) =>
              (b.fechaSolicitud || '').localeCompare(a.fechaSolicitud || '')
            );
          this.cargando = false;
        },
        error: () => {
          this.errorMsg = 'No se pudo cargar las solicitudes recibidas.';
          this.cargando = false;
        }
      });
    } else {
      this.errorMsg = 'Usuario no encontrado.';
      this.cargando = false;
    }
  }

  /** Aceptar una solicitud (solo aparece si estado === 'POR_ACEPTAR') */
  aceptar(id: number) {
    this.arriendoService.aceptarSolicitud(id).subscribe({
      next: () => {
        // Filtramos el arreglo para eliminar la que acabamos de aceptar
        this.solicitudesRecibidas = this.solicitudesRecibidas.filter(
          s => s.id !== id
        );
      },
      error: err => {
        console.error('Error al aceptar solicitud:', err);
      }
    });
  }

  /** Rechazar una solicitud (solo aparece si estado === 'POR_ACEPTAR') */
  rechazar(id: number) {
    this.arriendoService.rechazarSolicitud(id).subscribe({
      next: () => {
        // Filtramos el arreglo para eliminar la que acabamos de rechazar
        this.solicitudesRecibidas = this.solicitudesRecibidas.filter(
          s => s.id !== id
        );
      },
      error: err => {
        console.error('Error al rechazar solicitud:', err);
      }
    });
  }

  /**
   * Convierte un string ISO (p. ej. "2025-06-01T14:30:00") 
   * a un formato “dd/MM/yyyy HH:mm” en local “es-CO”.
   */
  formatearFechaHora(iso: string | undefined): string {
    if (!iso) return '';
    const d = new Date(iso);
    const opcionesFecha: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };
    const opcionesHora: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit'
    };
    const fechaPart = d.toLocaleDateString('es-CO', opcionesFecha);
    const horaPart = d.toLocaleTimeString('es-CO', opcionesHora);
    return `${fechaPart} ${horaPart}`;
  }
}
