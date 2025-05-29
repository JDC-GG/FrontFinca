import { Component, OnInit } from '@angular/core';
import { PropiedadService } from '../../../core/services/propiedad.service';
import { Propiedad } from '../../../models/propiedad.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  propiedadEditando: number | null = null;
  propiedadOriginal: Propiedad | null = null;

  constructor(private propiedadService: PropiedadService) {}

  ngOnInit() {
    this.cargarPropiedades();
  }

  cargarPropiedades(): void {
    this.propiedadService.getPropiedades().subscribe({
      next: (data) => this.propiedades = data,
      error: (err) => console.error('Error al cargar propiedades', err)
    });
  }

  iniciarEdicion(id: number): void {
    this.propiedadEditando = id;
    // Guardamos una copia de la propiedad original por si cancela la edición
    const propiedad = this.propiedades.find(p => p.id === id);
    if (propiedad) {
      this.propiedadOriginal = {...propiedad};
    }
  }

  cancelarEdicion(): void {
    if (this.propiedadOriginal && this.propiedadEditando) {
      // Restauramos los valores originales
      const index = this.propiedades.findIndex(p => p.id === this.propiedadEditando);
      if (index !== -1) {
        this.propiedades[index] = {...this.propiedadOriginal};
      }
    }
    this.propiedadEditando = null;
    this.propiedadOriginal = null;
  }

  guardarEdicion(propiedad: Propiedad): void {
    if (confirm('¿Estás seguro de guardar los cambios?')) {
      this.propiedadService.updatePropiedad(propiedad.id!, propiedad).subscribe({
        next: () => {
          alert('Propiedad actualizada correctamente');
          this.propiedadEditando = null;
          this.propiedadOriginal = null;
          this.cargarPropiedades(); // Recargamos para asegurarnos los datos están actualizados
        },
        error: (err) => {
          console.error('Error al actualizar propiedad', err);
          alert('Error al actualizar la propiedad');
          this.cancelarEdicion();
        }
      });
    }
  }

  eliminarPropiedad(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta propiedad?')) {
      this.propiedadService.deletePropiedad(id).subscribe({
        next: () => {
          alert('Propiedad eliminada correctamente');
          this.cargarPropiedades();
        },
        error: (err) => {
          console.error('Error al eliminar propiedad', err);
          alert('Error al eliminar la propiedad');
        }
      });
    }
  }
}