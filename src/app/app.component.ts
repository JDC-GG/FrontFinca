import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from './models /Usuario';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lospipol2';

  datosModeloServicio: Usuario[] = [];
  datosModeloServicioExterno: Usuario[] = [];

  datos = [
    { nombre: "Pablo", apellido: "Márquez" },
    { nombre: "María", apellido: "Pacheco" },
    { nombre: "Francisco", apellido: "Márquez" },
    { nombre: "Miguel", apellido: "Márquez" },
  ]
  datosPipol = [
    new Usuario("Pablo", "Márquez"),
    new Usuario("María", "Pacheco"),
    new Usuario("Francisco", "Márquez"),
    new Usuario("Miguel", "Márquez"),
  ]

  constructor(
    private UsuarioService: UsuarioService
  ) {
  }
  ngOnInit() {
    this.cargarUsuarioService();
    //this.cargarPipolServiceExterno();
  }
  cargarUsuarioService(){
    this.UsuarioService.getPipols().subscribe( (data: Usuario[]) => {
        this.datosModeloServicio = data;
      }
    );
  }

  cargarPipolServiceExterno(){
    this.UsuarioService.getPipolsExternos().then((data: Usuario[]) => {
        this.datosModeloServicioExterno = data;
      }
    ).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }
}
