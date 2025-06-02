// src/app/components/arriendo/solicitud-arriendo/solicitud-arriendo.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PropiedadService } from '../../../core/services/propiedad.service';
import { ArriendoService } from '../../../core/services/arriendo.service';

import { Propiedad } from '../../../models/propiedad.model';
import { arriendo } from '../../../models/arriendo.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-solicitud-arriendo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './solicitud-arriendo.component.html',
  styleUrls: ['./solicitud-arriendo.component.css']
})
export class SolicitudArriendoComponent implements OnInit {
  propiedad!: Propiedad;
  solicitudForm!: FormGroup;
  hoyStr!: string;       // Para validar que fechaLlegada >= hoy
  errorMsg: string | null = null;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private propiedadService: PropiedadService,
    private arriendoService: ArriendoService
  ) {}

  ngOnInit(): void {
    // 1) Obtener "hoy" en formato 'yyyy-MM-dd' para usar en <input type="date" min="...">
    const dp = new DatePipe('en-US');
    this.hoyStr = dp.transform(new Date(), 'yyyy-MM-dd')!;

    // 2) Recuperamos el ID de propiedad que viene en la URL (path param)
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const idStr = params.get('id');
          if (!idStr) {
            throw new Error('No se recibió ID de propiedad.');
          }
          const propiedadId = Number(idStr);
          // 3) Llamamos al servicio para obtener la Propiedad completa
          return this.propiedadService.getPropiedad(propiedadId);
        })
      )
      .subscribe({
        next: (prop) => {
          this.propiedad = prop;
          // 4) Una vez tenemos la propiedad, construimos el formulario
          this.crearFormulario();
        },
        error: (err) => {
          console.error('Error al cargar propiedad para solicitud:', err);
          this.errorMsg = 'No se pudo obtener información de la propiedad.';
        }
      });
  }

  /**
   * Crea el FormGroup Reactivo con sus validaciones:
   * - fechaLlegada: ≥ hoy
   * - fechaSalida: > fechaLlegada
   * - cantidadPersonas: 1 ≤ X ≤ propiedad.habitaciones
   */
  private crearFormulario(): void {
    this.solicitudForm = this.fb.group(
      {
        fechaLlegada: [
          '',
          [Validators.required, this.validarNoAntesDeHoy.bind(this)]
        ],
        fechaSalida: [
          '',
          [Validators.required]
        ],
        cantidadPersonas: [
          '',
          [
            Validators.required,
            Validators.min(1),
            Validators.max(this.propiedad.habitaciones)
          ]
        ]
      },
      {
        // Validación cruzada para que fechaSalida > fechaLlegada
        validators: this.validarSalidaPosterior.bind(this)
      }
    );
  }

  /**
   * Valida que la fecha de llegada no sea anterior a hoy.
   */
  private validarNoAntesDeHoy(control: any) {
    const valor: string = control.value; // "yyyy-MM-dd"
    if (!valor) {
      return null;
    }
    if (valor < this.hoyStr) {
      return { antesDeHoy: true };
    }
    return null;
  }

  /**
   * Valida en todo el grupo que fechaSalida sea mayor que fechaLlegada.
   */
  private validarSalidaPosterior(group: FormGroup) {
    const llegada = group.controls['fechaLlegada'].value;
    const salida = group.controls['fechaSalida'].value;
    if (!llegada || !salida) {
      return null;
    }
    // Si la salida no es posterior (>= o =), error:
    if (salida <= llegada) {
      return { fechaSalidaInvalida: true };
    }
    return null;
  }

  /**
   * Cuando el usuario da click en “Enviar Solicitud”:
   * - Si el formulario es inválido, marcamos errores
   * - Si es válido, creamos el DTO y hacemos POST al backend
   */
  onSubmit(): void {
    if (this.solicitudForm.invalid) {
      this.errorMsg = 'Corrige los errores en el formulario.';
      return;
    }

    this.errorMsg = null;
    const fLlegada = this.solicitudForm.value.fechaLlegada;
    const fSalida = this.solicitudForm.value.fechaSalida;
    const cp = Number(this.solicitudForm.value.cantidadPersonas);

    // Construimos el objeto que pide el servicio:
    const dto = {
      propiedadId: this.propiedad.id,
      fechaLlegada: fLlegada,
      fechaSalida: fSalida,
      cantidadPersonas: cp
    };

    this.arriendoService.createArriendo(dto).subscribe({
      next: (res: arriendo) => {
        alert('Solicitud creada exitosamente.');
        // Redirige a la lista de solicitudes:
        this.router.navigate(['/arriendos/solicitudes']);
      },
      error: (err: any) => {
        console.error('Error al crear la solicitud:', err);
        this.errorMsg =
          err?.error?.message ||
          'Ocurrió un error al enviar la solicitud. Intenta nuevamente.';
      }
    });
    
  }
}
