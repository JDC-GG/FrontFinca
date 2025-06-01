// src/app/components/propiedad/detalle-propiedad/detalle-propiedad.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PropiedadService } from '../../../core/services/propiedad.service';
import { Propiedad } from '../../../models/propiedad.model';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';    // ← Importar Location

@Component({
  selector: 'app-detalle-propiedad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-propiedad.component.html',
  styleUrls: ['./detalle-propiedad.component.css']
})
export class DetallePropiedadComponent implements OnInit {
  propiedad$!: Observable<Propiedad>;

  constructor(
    private route: ActivatedRoute,
    private propiedadService: PropiedadService,
    private location: Location             // ← Inyectar Location aquí
  ) { }

  ngOnInit(): void {
    this.propiedad$ = this.route.paramMap.pipe(
      switchMap(params => {
        const idStr = params.get('id');
        if (!idStr) {
          throw new Error('No se recibió ID de propiedad en la ruta');
        }
        const id = Number(idStr);
        return this.propiedadService.getPropiedad(id);
      })
    );
  }

  volver(): void {
    this.location.back(); 
  }
}