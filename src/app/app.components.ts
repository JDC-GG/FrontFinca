// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { AuthService } from './core/services/auth.service';
import { Usuario } from './models/usuario.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.components.html',
  styleUrls: ['./app.components.css']
})
export class AppComponent implements OnInit {
  usuario$: Observable<Usuario | null>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.usuario$ = this.authService.currentUser$;
  }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
