import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PropiedadService } from '../../../core/services/propiedad.service';
import { Propiedad } from '../../../models/propiedad.model';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

// Importar AuthService y el modelo Usuario
import { AuthService } from '../../../core/services/auth.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-detalle-propiedad',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-propiedad.component.html',
  styleUrls: ['./detalle-propiedad.component.css']
})
export class DetallePropiedadComponent implements OnInit {
  // Observable de la propiedad que recuperaremos usando el ID de la ruta
  propiedad$!: Observable<Propiedad>;

  // Observable del usuario logueado (puede ser null si no hay nadie conectado)
  usuario$!: Observable<Usuario | null>;

  constructor(
    private route: ActivatedRoute,
    private propiedadService: PropiedadService,
    private location: Location,
    private authService: AuthService,   // ← Inyectar AuthService
    private router: Router               // ← Inyectar Router para navegar al formulario
  ) {
    // Nos suscribimos al BehaviorSubject de AuthService para obtener el usuario actual
    this.usuario$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.propiedad$ = this.route.paramMap.pipe(
      switchMap(params => {
        const idStr = params.get('id');
        if (!idStr) {
          throw new Error('No se recibió ID de propiedad en la ruta');
        }
        const id = Number(idStr);
        return this.propiedadService.getPropiedad(id);
      })
    );
  }

  
  solicitarArriendo(propiedadId: number): void {
    this.router.navigate(['/arriendos/solicitar', propiedadId]);
  }

  volver(): void {
    this.location.back();
  }
}
