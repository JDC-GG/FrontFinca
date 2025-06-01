// src/app/components/arriendo/lista-arriendos/lista-arriendos.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropiedadService } from '../../../core/services/propiedad.service';
import { Propiedad } from '../../../models/propiedad.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-arriendos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-arriendos.component.html',
  styleUrls: ['./lista-arriendos.component.css']
})
export class ListaArriendosComponent implements OnInit {
  propiedades: Propiedad[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private propiedadService: PropiedadService) {}

  ngOnInit(): void {
    this.cargarPropiedades();
  }

  cargarPropiedades(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.propiedadService.getPropiedades().subscribe({
      next: (data) => {
        this.propiedades = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar propiedades', err);
        this.errorMessage = 'No se pudieron cargar las propiedades. Intente nuevamente más tarde.';
        this.isLoading = false;
      }
    });
  }

  getImagen(propiedad: Propiedad): string {
    // Por ahora usaremos imágenes de placeholder por temas de base de datos
    const imagenes = [
      'assets/images/imagen1.jpg',
      'assets/images/imagen2.jpg',
      'assets/images/imagen3.jpg',
      'assets/images/imagen4.webp',
      'assets/images/imagen5.jpeg',
      'assets/images/imagen6.jpg'
    ];
    return imagenes[propiedad.id % imagenes.length] || 'assets/images/default.jpg';
  }
}