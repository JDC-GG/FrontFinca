// src/app/components/login/login.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { Usuario } from '../../../models/usuario.model';

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
    private authService: AuthService, // ← inyectamos AuthService en vez de UsuarioService
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]]
    });

    // Limpiar mensaje de error al editar cualquiera de los dos campos
    this.loginForm.valueChanges.subscribe(() => {
      this.errorMsg = null;
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const correo = this.loginForm.value.correo;
    const contrasena = this.loginForm.value.contrasena;

    // Llamamos a AuthService.login, que internamente hace POST /login
    this.authService.login(correo, contrasena).subscribe({
      next: (usuario: Usuario) => {
        // Si llegamos aquí, el backend devolvió { token, usuario } correctamente,
        // AuthService ya guardó token y emitió currentUserSubject.next(usuario)

        // Redirigir según rol
        if (usuario.rol === 'ARRENDADOR') {
          this.router.navigate(['/propiedades']);
        } else if (usuario.rol === 'ARRENDATARIO') {
          this.router.navigate(['/arriendos']);
        } else {
          // Si por alguna razón no coincide el rol
          this.errorMsg = 'Rol no reconocido.';
        }
      },
      error: (err) => {
        console.error('Error en login:', err);
        // Si el backend devolvió 401, o hubo otro fallo, mostramos mensaje
        this.errorMsg = 'Credenciales inválidas. Intenta de nuevo.';
      }
    });
  }
}
