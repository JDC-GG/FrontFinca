// src/app/components/arriendo/pago-arriendo/pago-arriendo.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pago-arriendo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="contenedor-pago">
      <h2>Pago de Solicitud</h2>
      <p>ID de solicitud: {{ solicitudId }}</p>

      <div class="zona-pago">
        <p>Simulación de pago para la solicitud.</p>
        <button class="btn-confirmar" (click)="confirmarPago()">Confirmar Pago</button>
      </div>
    </div>
  `,
  styles: [`
    .contenedor-pago {
      padding: 1.5rem;
      max-width: 600px;
      margin: auto;
    }
    .zona-pago {
      margin-top: 2rem;
      text-align: center;
    }
    .btn-confirmar {
      padding: 0.5rem 1rem;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  `]
})
export class PagoArriendoComponent implements OnInit {
  solicitudId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.solicitudId = this.route.snapshot.paramMap.get('id');
  }

  confirmarPago(): void {
    alert(`Pago confirmado para solicitud ID ${this.solicitudId}`);
  }
}
