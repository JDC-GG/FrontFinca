import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PropiedadService } from '../../../core/services/propiedad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-propiedad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-propiedad.component.html',
  styleUrls: ['./formulario-propiedad.component.css']
})
export class FormularioPropiedadComponent implements OnInit {
  propiedadForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private propiedadService: PropiedadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.propiedadForm = this.fb.group({
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(1)]]
    });
  }

  guardarPropiedad(): void {
    const propiedad = this.propiedadForm.value;

    this.propiedadService.createPropiedad(propiedad).subscribe({
      next: () => {
        alert('Propiedad guardada exitosamente');
        this.router.navigate(['/propiedades']);
      },
      error: (err) => {
        console.error('Error al guardar propiedad', err);
        alert('Error al guardar la propiedad');
      }
    });
  }
}
