// src/app/components/arriendo/lista-solicitudes/lista-solicitudes.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { ArriendoService } from '../../../core/services/arriendo.service';
import { arriendo } from '../../../models/arriendo.model';

@Component({
  selector: 'app-lista-solicitudes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-solicitudes.component.html',
  styleUrls: ['./lista-solicitudes.component.css']
})
export class ListaSolicitudesComponent implements OnInit {
  solicitudesPendientes: arriendo[] = [];
  historialSolicitudes: arriendo[] = [];
  cargando = true;
  errorMsg: string | null = null;

  constructor(
    private arriendoService: ArriendoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarTodasLasSolicitudes();
  }

  private cargarTodasLasSolicitudes(): void {
    this.cargando = true;
    this.errorMsg = null;

    this.arriendoService.getMisArriendos().subscribe({
      next: (lista: arriendo[]) => {
        // 1) Filtrar solo las que están en PENDIENTE_PAGO, ordenándolas DESC por fechaSolicitud
        this.solicitudesPendientes = lista
          .filter((s) => s.estado === 'PENDIENTE_PAGO')
          .sort((a, b) =>
            (b.fechaSolicitud || '').localeCompare(a.fechaSolicitud || '')
          );

        // 2) Historial completo: todas, ordenadas DESC por fechaSolicitud
        this.historialSolicitudes = lista
          .slice() // clonamos para no mutar el arreglo original
          .sort((a, b) =>
            (b.fechaSolicitud || '').localeCompare(a.fechaSolicitud || '')
          );

        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar solicitudes:', err);
        this.errorMsg = 'No se pudo cargar el historial de solicitudes.';
        this.cargando = false;
      }
    });
  }

  /**
   * Formatea un string ISO de fecha/hora en formato “dd/MM/yyyy HH:mm”
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

  
  irAPago(solicitudId: number | undefined): void {
    if (!solicitudId) return;
    this.router.navigate(['/arriendos/pago', solicitudId]);
  }
}
