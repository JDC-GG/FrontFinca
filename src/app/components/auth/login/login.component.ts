import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service'; 

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
    private authService: AuthService,
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
      const { correo, contrasena } = this.loginForm.value;
      this.authService.login(correo, contrasena).subscribe({
        next: () => this.router.navigate(['/propiedades']), 
        error: err => {
          console.error('Error en el login:', err);
          if (err.status === 401 || err.status === 400) {
            this.errorMsg = err.error?.message || 'Correo o contraseña incorrectos.';
          } else {
            this.errorMsg = 'Ocurrió un error inesperado. Intenta nuevamente.';
          }
        }        
      });
    }
  }
}
