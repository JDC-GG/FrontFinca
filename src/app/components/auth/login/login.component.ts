import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsuarioService } from '../../../core/services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMsg: string | null = null;

  constructor(
    private fb: FormBuilder,

    private usuarioService: UsuarioService,

   
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]]
    });

    // Limpiar mensaje de error al editar campos
     this.loginForm.valueChanges.subscribe(() => {
      this.errorMsg = null;
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = {
        correo: this.loginForm.value.email,        
        contrasena: this.loginForm.value.password  
      };

      console.log('Enviando al backend:', loginData); 

      this.usuarioService.loginUsuario(loginData).subscribe({
        next: (usuario) => {
          console.log('Usuario recibido del backend:', usuario); 
          alert('¡Login exitoso!');

          // Redirigir según rol
          if (usuario.rol === 'ARRENDADOR') {
            this.router.navigate(['/dashboard-arrendador']);
          } else if (usuario.rol === 'ARRENDATARIO') {
            this.router.navigate(['/home-arrendatario']);
          } else {
            alert('Rol no reconocido.');
          }
        },
        error: (err) => {
          alert('Credenciales incorrectas o usuario no encontrado.');
          console.error('Error del backend:', err);
        }
      });
    } else {
      alert('Por favor completa todos los campos correctamente.');

    }
  }
}
