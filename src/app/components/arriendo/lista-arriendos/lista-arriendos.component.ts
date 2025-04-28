import { Component, OnInit } from '@angular/core';
import { PropiedadService } from '../../../core/services/propiedad.service';
import { Propiedad } from '../../../models/propiedad.model';

@Component({
  selector: 'app-lista-arriendos',
  imports: [],
  templateUrl: './lista-arriendos.component.html',
  styleUrl: './lista-arriendos.component.css'
})
export class ListaArriendosComponent implements OnInit {
  arriendos: Propiedad[] = [];  // Ahora los arriendos serán obtenidos del servicio

  constructor(private propiedadService: PropiedadService) { }

  ngOnInit(): void {
    this.getArriendos();  // Llamamos al servicio para obtener las propiedades
  }

  // Método para obtener las propiedades
  getArriendos(): void {
    this.propiedadService.getPropiedades().subscribe({
      next: (data) => {
        this.arriendos = data;  // Asignamos los datos obtenidos al arreglo 'arriendos'
      },
      error: (err) => {
        console.error('Error al obtener las propiedades', err);
      }
    });
  }
}