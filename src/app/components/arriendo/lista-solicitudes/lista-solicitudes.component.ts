// src/app/components/arriendo/lista-solicitudes/lista-solicitudes.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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

  constructor(private arriendoService: ArriendoService, private router: Router) {}

  ngOnInit(): void {
    this.cargarTodasLasSolicitudes();
  }

  private cargarTodasLasSolicitudes(): void {
    this.cargando = true;
    this.errorMsg = null;

    this.arriendoService.getMisArriendos().subscribe({
      next: (lista: arriendo[]) => {
        // -> Estado PENDIENTE_PAGO: muestra botón “Ir a Pago”
        this.solicitudesPendientes = lista
          .filter(s => s.estado === 'PENDIENTE_PAGO')
          .sort((a, b) =>
            (b.fechaSolicitud || '').localeCompare(a.fechaSolicitud || '')
          );

        // -> Historial (muestra todas las solicitudes, sea cual sea el estado)
        this.historialSolicitudes = lista
          .slice()
          .sort((a, b) =>
            (b.fechaSolicitud || '').localeCompare(a.fechaSolicitud || '')
          );

        this.cargando = false;
      },
      error: err => {
        console.error('Error al cargar solicitudes:', err);
        this.errorMsg = 'No se pudo cargar el historial de solicitudes.';
        this.cargando = false;
      }
    });
  }

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

  irAPago(id: number): void {
    this.router.navigate(['/arriendos/pagar', id]);
  }

}
