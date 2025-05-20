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
      titulo: 'Palm Harbor',
      direccion: '2699 Green Valley, Highland Lake, FL',
      imagen: 'assets/images/imagen1.jpg'
    },
    {
      precio: 2700,
      titulo: 'Beverly Springfield',
      direccion: '2821 Lake Sevilla, Palm Harbor, TX',
      imagen: 'assets/images/imagen2.jpg'
    },
    {
      precio: 4550,
      titulo: 'Faulkner Ave',
      direccion: '909 Woodland St, Michigan, IN',
      imagen: 'assets/images/imagen3.jpg'
    },
    {
      precio: 2400,
      titulo: 'St. Crystal',
      direccion: '2104 Foley St, Chicago, IL',
      imagen: 'assets/images/imagen4.webp'
    },
    {
      precio: 1500,
      titulo: 'Cove Red',
      direccion: '7231 Riverland St, San Diego, CA',
      imagen: 'assets/images/imagen5.jpeg'
    },
    {
      precio: 1600,
      titulo: 'Tarpon Bay',
      direccion: '1253 Grand Lake Rd, Tampa, FL',
      imagen: 'assets/images/imagen6.jpg'
    }
  ];
  
}