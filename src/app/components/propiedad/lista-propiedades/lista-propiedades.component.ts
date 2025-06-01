// src/app/components/propiedad/lista-propiedades/lista-propiedades.component.ts

import { Component, OnInit } from '@angular/core';
import { PropiedadService } from '../../../core/services/propiedad.service';
import { Propiedad } from '../../../models/propiedad.model';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-propiedades',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './lista-propiedades.component.html',
  styleUrls: ['./lista-propiedades.component.css']
})
export class ListaPropiedadesComponent implements OnInit {
  propiedades: Propiedad[] = [];

  constructor(
    private propiedadService: PropiedadService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarPropiedades();
  }

  cargarPropiedades(): void {
    this.propiedadService.getPropiedades().subscribe({
      next: (data) => (this.propiedades = data),
      error: (err) => console.error('Error al cargar propiedades', err)
    });
  }

  verDetalle(id: number): void {
    this.router.navigate(['/propiedades', id]);
  }

  editar(id: number): void {
    this.router.navigate(['/propiedades', id, 'editar']);
  }
}
