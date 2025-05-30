import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FormularioUsuarioComponent {
  formCalificacion: FormGroup;
  estrellasSeleccionadas = 0;
  enviado = false;

  constructor(private fb: FormBuilder) {
    this.formCalificacion = this.fb.group({
      estrellas: [0, [Validators.required, Validators.min(1)]],
      comentario: ['']
    });
  }

  seleccionarEstrellas(valor: number): void {
    this.estrellasSeleccionadas = valor;
    this.formCalificacion.get('estrellas')?.setValue(valor);
  }

  enviarCalificacion(): void {
  if (this.formCalificacion.valid) {
    console.log('Calificación enviada:', this.formCalificacion.value);
    this.enviado = true;

    // Limpiar el formulario y las estrellas
    this.formCalificacion.reset({ estrellas: 0, comentario: '' });
    this.estrellasSeleccionadas = 0;

    // Ocultar mensaje después de 3 segundos (opcional)
    setTimeout(() => {
      this.enviado = false;
    }, 3000);
  }
}

}
