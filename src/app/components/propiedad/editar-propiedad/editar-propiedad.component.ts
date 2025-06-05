// src/app/components/propiedad/editar-propiedad/editar-propiedad.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { PropiedadService } from '../../../core/services/propiedad.service';
import { Propiedad } from '../../../models/propiedad.model';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

interface Opcion {
  value: string;
  label: string;
}

@Component({
  selector: 'app-editar-propiedad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar-propiedad.component.html',
  styleUrls: ['./editar-propiedad.component.css']
})
export class EditarPropiedadComponent implements OnInit {
  propiedadForm!: FormGroup;
  propiedadId!: number;
  isLoading = true;
  errorMsg: string | null = null;

  // Listas fijas para los <select> (mismo patrón que en crear-propiedad)
  tiposIngreso: Opcion[] = [
    { value: 'EN_MUNICIPIO',       label: 'En municipio' },
    { value: 'CARRETERA_PRINCIPAL', label: 'Carretera principal' },
    { value: 'CARRETERA_SECUNDARIA', label: 'Carretera secundaria' },
    { value: 'CARRETERA_TERCIARIA', label: 'Carretera terciaria' }
  ];
  statuses: Opcion[] = [
    { value: 'ACTIVA',  label: 'Activa' },
    { value: 'INACTIVA', label: 'Inactiva' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private propiedadService: PropiedadService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // 1) Construir el FormGroup vacío con validaciones idénticas a "Crear"
    this.propiedadForm = this.fb.group({
      nombre:      ['', Validators.required],
      departamento:['', Validators.required],
      municipio:   ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      habitaciones: [1, [Validators.required, Validators.min(1)]],
      banos:       [1, [Validators.required, Validators.min(1)]],
      mascotas:    [false],
      piscina:     [false],
      asador:      [false],
      valorNoche:  [0, [Validators.required, Validators.min(0.1)]],
      tipoIngreso: ['', Validators.required],
      status:      ['', Validators.required],
      idUsuario:   [0, Validators.required] // no se muestra, pero necesitamos mandarlo
    });

    // 2) Leer ID de la ruta y cargar la propiedad desde el servicio
    this.route.paramMap.pipe(
      switchMap(params => {
        const idStr = params.get('id');
        if (!idStr) {
          this.errorMsg = 'ID de propiedad inválido.';
          return of(null);
        }
        this.propiedadId = Number(idStr);
        return this.propiedadService.getPropiedad(this.propiedadId);
      })
    ).subscribe({
      next: (propiedad: Propiedad | null) => {
        if (!propiedad) {
          // Si no vino ningún objeto, mostramos error en pantalla
          this.isLoading = false;
          this.errorMsg = 'No se encontró la propiedad solicitada.';
          return;
        }

        // 3) Patchear el formulario con los valores que llegaron
        this.propiedadForm.patchValue({
          nombre:      propiedad.nombre,
          departamento:propiedad.departamento,
          municipio:   propiedad.municipio,
          descripcion: propiedad.descripcion,
          habitaciones: propiedad.habitaciones,
          banos:       propiedad.banos,
          mascotas:    propiedad.mascotas,
          piscina:     propiedad.piscina,
          asador:      propiedad.asador,
          valorNoche:  propiedad.valorNoche,
          tipoIngreso: propiedad.tipoIngreso,
          status:      propiedad.status,
          idUsuario:   propiedad.idUsuario
        });

        this.isLoading = false;
      },
      error: err => {
        console.error('Error al cargar la propiedad:', err);
        this.errorMsg = 'No se pudo cargar la propiedad.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Comprueba si un campo del formulario es inválido y ha sido tocado
   */
  campoInvalido(controlName: string): boolean {
    const control = this.propiedadForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  /**
   * Enviar cambios al backend para actualizar la propiedad
   */
  guardarCambios(): void {
    if (this.propiedadForm.invalid) {
      this.propiedadForm.markAllAsTouched();
      return;
    }

    // Construir el objeto con EXACTAMENTE las mismas propiedades que el DTO espera
    const dto: Partial<Propiedad> = {
      nombre:       this.propiedadForm.value.nombre,
      departamento: this.propiedadForm.value.departamento,
      municipio:    this.propiedadForm.value.municipio,
      descripcion:  this.propiedadForm.value.descripcion,
      habitaciones: this.propiedadForm.value.habitaciones,
      banos:        this.propiedadForm.value.banos,
      mascotas:     this.propiedadForm.value.mascotas,
      piscina:      this.propiedadForm.value.piscina,
      asador:       this.propiedadForm.value.asador,
      valorNoche:   this.propiedadForm.value.valorNoche,
      tipoIngreso:  this.propiedadForm.value.tipoIngreso,
      status:       this.propiedadForm.value.status,
      idUsuario:    this.propiedadForm.value.idUsuario
    };

    this.propiedadService.updatePropiedad(this.propiedadId, dto as Propiedad).subscribe({
      next: () => {
        alert('Propiedad actualizada correctamente');
        this.router.navigate(['/propiedades']);
      },
      error: err => {
        console.error('Error al actualizar la propiedad', err);
        alert('No se pudieron guardar los cambios.');
      }
    });
  }

  /**
   * Desactivar: cambia el status a INACTIVA y envía
   */
  desactivar(): void {
    const valorActual = this.propiedadForm.value.status;
    if (valorActual !== 'ACTIVA') {
      alert('La propiedad ya está inactiva');
      return;
    }
    this.propiedadForm.patchValue({ status: 'INACTIVA' });
    this.guardarCambios();
  }

  /**
   * Reactivar: cambia el status a ACTIVA y envía
   */
  reactivar(): void {
    const valorActual = this.propiedadForm.value.status;
    if (valorActual !== 'INACTIVA') {
      alert('La propiedad ya está activa');
      return;
    }
    this.propiedadForm.patchValue({ status: 'ACTIVA' });
    this.guardarCambios();
  }

  /**
   * Eliminar la propiedad completamente
   */
  eliminar(): void {
    if (!confirm('¿Estás seguro de eliminar esta propiedad?')) {
      return;
    }
    this.propiedadService.deletePropiedad(this.propiedadId).subscribe({
      next: () => {
        alert('Propiedad eliminada correctamente');
        this.router.navigate(['/propiedades']);
      },
      error: err => {
        console.error('Error al eliminar la propiedad', err);
        alert('No se pudo eliminar la propiedad');
      }
    });
  }

  /**
   * Volver a la pantalla anterior sin guardar nada
   */
  volver(): void {
    this.location.back();
  }
}
