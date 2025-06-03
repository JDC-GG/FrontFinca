// src/app/components/arriendo/pago-arriendo/pago-arriendo.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';              // <-- Importa FormsModule aquí
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ArriendoService } from '../../../core/services/arriendo.service';
import { arriendo } from '../../../models/arriendo.model';

@Component({
  selector: 'app-pago-arriendo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],     // <-- Agrega FormsModule a imports
  templateUrl: './pago-arriendo.component.html',
  styleUrls: ['./pago-arriendo.component.css']
})
export class PagoArriendoComponent implements OnInit {
  arriendo: arriendo | null = null;
  bancos: string[] = ['Bancolombia', 'Banco de Bogotá', 'Davivienda', 'BBVA', 'Scotiabank'];
  bancoSeleccionado: string = '';
  numeroCuenta: string = '';
  isLoading = true;
  errorMsg: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private arriendoService: ArriendoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idSolicitud = Number(this.route.snapshot.paramMap.get('id'));
    if (!idSolicitud) {
      this.errorMsg = 'ID de solicitud inválido.';
      this.isLoading = false;
      return;
    }
  
    this.arriendoService.getArriendoById(idSolicitud).subscribe({
      next: (res: arriendo) => {
        this.arriendo = res;
        this.isLoading = false;
      },
      error: err => {
        console.error('Error al cargar la solicitud:', err);
        this.errorMsg = 'No se pudo cargar la solicitud de arriendo.';
        this.isLoading = false;
      }
    });
  }
  
  realizarPago(): void {
    // Verificamos que arriendo, id y valorTotal existan
    if (!this.arriendo || this.arriendo.id == null || this.arriendo.valorTotal == null) {
      this.errorMsg = 'No hay datos completos de la solicitud para realizar el pago.';
      return;
    }

    // Construimos el objeto pagoData
    const pagoData = {
      solicitudId: this.arriendo.id,
      banco: this.bancoSeleccionado,
      numeroCuenta: this.numeroCuenta,
      valor: this.arriendo.valorTotal
    };

    this.arriendoService.realizarPago(pagoData).subscribe({
      next: () => {
        this.router.navigate(['/arriendos/solicitudes']);
      },
      error: err => {
        console.error('Error en el pago:', err);
        this.errorMsg = 'Ocurrió un error al procesar el pago.';
      }
    });
  }
}
