import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-arriendos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-arriendos.component.html',
  styleUrls: ['./lista-arriendos.component.css']
})
export class ListaArriendosComponent {
  propiedades = [
    {
      precio: 2015,
      nombre: 'Palm Harbor',
      ubicacion: '2699 Green Valley, Highland Lake, FL',
      imagen: 'assets/images/imagen1.jpg'
    },
    {
      precio: 2700,
      nombre: 'Beverly Springfield',
      ubicacion: '2821 Lake Sevilla, Palm Harbor, TX',
      imagen: 'assets/images/imagen2.jpg'
    },
    {
      precio: 4550,
      nombre: 'Faulkner Ave',
      ubicacion: '909 Woodland St, Michigan, IN',
      imagen: 'assets/images/imagen3.jpg'
    },
    {
      precio: 2400,
      nombre: 'St. Crystal',
      ubicacion: '2104 Foley St, Chicago, IL',
      imagen: 'assets/images/imagen4.webp'
    },
    {
      precio: 1500,
      nombre: 'Cove Red',
      ubicacion: '7231 Riverland St, San Diego, CA',
      imagen: 'assets/images/imagen5.jpeg'
    },
    {
      precio: 1600,
      nombre: 'Tarpon Bay',
      ubicacion: '1253 Grand Lake Rd, Tampa, FL',
      imagen: 'assets/images/imagen6.jpg'
    }
  ];
  
}