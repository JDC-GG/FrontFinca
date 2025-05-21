import { Component, OnInit } from '@angular/core';
import { PropiedadService } from '../../../core/services/propiedad.service';
import { Propiedad } from '../../../models/propiedad.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-propiedades',
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-propiedades.component.html',
  styleUrl: './lista-propiedades.component.css'
})
export class ListaPropiedadesComponent implements OnInit {
  propiedades: Propiedad[] = [];

  constructor(private propiedadService: PropiedadService) {}

  ngOnInit() {
    this.propiedadService.getPropiedades().subscribe({
      next: (data) => this.propiedades = data,
      error: (err) => console.error('Error al cargar propiedades', err)
    });
  }
}
