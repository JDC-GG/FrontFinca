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
        correo: this.loginForm.value.correo,          
        contrasena: this.loginForm.value.contrasena   
      };

      console.log('Enviando al backend:', loginData); 

      this.usuarioService.loginUsuario(loginData).subscribe({
        next: (response) => {
          console.log('Respuesta completa del backend:', response); 
        
          const usuario = response.usuario;
          const token = response.token;
        
          if (usuario && usuario.rol) {
            // Guardar el token en localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('usuario', JSON.stringify(usuario));
        
            alert('¡Login exitoso!');
        
            // Redirigir según rol
            if (usuario.rol === 'ARRENDADOR') {
              this.router.navigate(['/propiedades']);
            } else if (usuario.rol === 'ARRENDATARIO') {
              this.router.navigate(['/arriendos']);
            } else {
              alert('Rol no reconocido.');
            }
          } else {
            alert('Respuesta inválida del servidor.');
          }
        }
         
      });
    } 
  }
}
