// src/app/components/propiedad/editar-propiedad/editar-propiedad.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PropiedadService } from '../../../core/services/propiedad.service';
import { Propiedad } from '../../../models/propiedad.model';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-propiedad',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './editar-propiedad.component.html',
  styleUrls: ['./editar-propiedad.component.css']
})
export class EditarPropiedadComponent implements OnInit {
  propiedad$!: Observable<Propiedad>;
  propiedadId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propiedadService: PropiedadService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.propiedad$ = this.route.paramMap.pipe(
      switchMap(params => {
        const idStr = params.get('id');
        if (!idStr) {
          throw new Error('No se recibió ID de propiedad en la ruta');
        }
        this.propiedadId = Number(idStr);
        return this.propiedadService.getPropiedad(this.propiedadId);
      })
    );
  }

  desactivar(propiedad: Propiedad): void {
    const propiedadActualizada: Propiedad = {
      ...propiedad,
      status: 'INACTIVA'
    };
    this.propiedadService.updatePropiedad(this.propiedadId, propiedadActualizada)
      .subscribe({
        next: () => {
          alert('Propiedad desactivada correctamente');
          this.location.back();
        },
        error: (err) => {
          console.error('Error al desactivar la propiedad', err);
          alert('No se pudo desactivar la propiedad');
        }
      });
  }

  reactivar(propiedad: Propiedad): void {
    const propiedadActualizada: Propiedad = {
      ...propiedad,
      status: 'ACTIVA'
    };
    this.propiedadService.updatePropiedad(this.propiedadId, propiedadActualizada)
      .subscribe({
        next: () => {
          alert('Propiedad reactivada correctamente');
          this.location.back();
        },
        error: (err) => {
          console.error('Error al reactivar la propiedad', err);
          alert('No se pudo reactivar la propiedad');
        }
      });
  }

  eliminar(propiedadId: number): void {
    if (!confirm('¿Estás seguro de eliminar esta propiedad?')) {
      return;
    }
    this.propiedadService.deletePropiedad(propiedadId)
      .subscribe({
        next: () => {
          alert('Propiedad eliminada correctamente');
          this.router.navigate(['/propiedades']);
        },
        error: (err) => {
          console.error('Error al eliminar la propiedad', err);
          alert('No se pudo eliminar la propiedad');
        }
      });
  }

  volver(): void {
    this.location.back();
  }
}
