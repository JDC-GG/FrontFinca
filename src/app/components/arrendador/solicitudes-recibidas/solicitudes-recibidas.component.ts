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
  solicitudes: arriendo[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private arriendoService: ArriendoService) {}

  ngOnInit(): void {
  const usuarioRaw = localStorage.getItem('usuario'); // o 'currentUser' si es el que usas
  const usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null;
  const idDueno = usuario?.id;

  if (idDueno) {
    this.arriendoService.getSolicitudesRecibidas(idDueno).subscribe({
      next: (data) => {
        this.solicitudes = data;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el historial de solicitudes.';
        this.isLoading = false;
      }
    });
  } else {
    this.error = 'No se encontró un ID de dueño válido.';
    this.isLoading = false;
  }
}



  aceptar(id: number) {
    this.arriendoService.aceptarSolicitud(id).subscribe(() => {
      this.solicitudes = this.solicitudes.map(s =>
        s.id === id ? { ...s, estado: 'ACEPTADA' } : s
      );
    });
  }

  rechazar(id: number) {
    this.arriendoService.rechazarSolicitud(id).subscribe(() => {
      this.solicitudes = this.solicitudes.map(s =>
        s.id === id ? { ...s, estado: 'RECHAZADA' } : s
      );
    });
  }
}
