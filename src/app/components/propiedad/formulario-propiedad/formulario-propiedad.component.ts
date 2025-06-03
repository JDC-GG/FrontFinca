// src/app/components/propiedad/formulario-propiedad/formulario-propiedad.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PropiedadService } from '../../../core/services/propiedad.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

interface Opcion {
  value: string;
  label: string;
}

@Component({
  selector: 'app-formulario-propiedad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-propiedad.component.html',
  styleUrls: ['./formulario-propiedad.component.css']
})
export class FormularioPropiedadComponent implements OnInit {
  propiedadForm!: FormGroup;

  // Listas para los <select>
  tiposIngreso: Opcion[] = [
    { value: 'EN_MUNICIPIO', label: 'En municipio' },
    { value: 'CARRETERA_PRINCIPAL', label: 'Carretera principal' },
    { value: 'CARRETERA_SECUNDARIA', label: 'Carretera secundaria' },
    { value: 'CARRETERA_TERCIARIA', label: 'Carretera terciaria' }
  ];

  statuses: Opcion[] = [
    { value: 'ACTIVA', label: 'Activa' },
    { value: 'INACTIVA', label: 'Inactiva' }
    // Si añades más enums en tu back, inclúyelos aquí
  ];

  constructor(
    private fb: FormBuilder,
    private propiedadService: PropiedadService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.propiedadForm = this.fb.group({
      nombre: ['', Validators.required],
      departamento: ['', Validators.required],
      municipio: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      habitaciones: [1, [Validators.required, Validators.min(1)]],
      banos: [1, [Validators.required, Validators.min(1)]],
      mascotas: [false],
      piscina: [false],
      asador: [false],
      valorNoche: [0, [Validators.required, Validators.min(0.1)]],
      tipoIngreso: ['', Validators.required],
      status: ['ACTIVA', Validators.required]
    });
  }

  /**
   * Comprueba si un campo es inválido y ya fue tocado o modificado.
   */
  campoInvalido(controlName: string): boolean {
    const control = this.propiedadForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  guardarPropiedad(): void {
    const usuario = this.authService.getCurrentUser();
    if (!usuario) {
      alert('Debes iniciar sesión para crear una propiedad');
      return;
    }

    if (this.propiedadForm.invalid) {
      this.propiedadForm.markAllAsTouched();
      return;
    }

    // Construimos el objeto DTO con TODOS los campos que el backend espera:
    const dto = {
      nombre: this.propiedadForm.value.nombre,
      departamento: this.propiedadForm.value.departamento,
      municipio: this.propiedadForm.value.municipio,
      descripcion: this.propiedadForm.value.descripcion,
      habitaciones: this.propiedadForm.value.habitaciones,
      banos: this.propiedadForm.value.banos,
      mascotas: this.propiedadForm.value.mascotas,
      piscina: this.propiedadForm.value.piscina,
      asador: this.propiedadForm.value.asador,
      valorNoche: this.propiedadForm.value.valorNoche,
      tipoIngreso: this.propiedadForm.value.tipoIngreso,
      status: this.propiedadForm.value.status,
      idUsuario: usuario.id
    };

    this.propiedadService.createPropiedad(dto).subscribe({
      next: () => {
        alert('Propiedad guardada exitosamente');
        this.propiedadForm.reset({
          nombre: '',
          departamento: '',
          municipio: '',
          descripcion: '',
          habitaciones: 1,
          banos: 1,
          mascotas: false,
          piscina: false,
          asador: false,
          valorNoche: 0,
          tipoIngreso: '',
          status: 'ACTIVA'
        });
        this.router.navigate(['/propiedades']);
      },
      error: (err) => {
        console.error('Error al guardar propiedad', err);
        alert('Error al guardar la propiedad');
      }
    });
  }
}
