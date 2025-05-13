import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rol: ['', Validators.required] // 👈 Nuevo campo de selección de rol
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const nuevoUsuario = {
        nombre: this.registroForm.value.nombre,
        apellido: this.registroForm.value.apellido,
        telefono: this.registroForm.value.telefono,
        correo: this.registroForm.value.email,
        contrasena: this.registroForm.value.password,
        rol: this.registroForm.value.rol // 👈 Se envía el rol
      };

      console.log('Formulario enviado:', nuevoUsuario);

      this.usuarioService.createUsuario(nuevoUsuario).subscribe({
        next: () => {
          alert('¡Usuario registrado con éxito!');
          this.registroForm.reset();
        },
        error: (err) => {
          alert('Error al registrar: ' + (err?.error?.message || 'Error desconocido'));
          console.error(err);
        }
      });
    } else {
      alert('Por favor completa todos los campos correctamente.');
    }
  }
}
