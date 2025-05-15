import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-propiedad',
   imports: [FormsModule],
  templateUrl: './detalle-propiedad.component.html',
  styleUrls: ['./detalle-propiedad.component.css']
})
export class DetallePropiedadComponent implements OnInit {
  propiedad: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // ⚠️ Esto es solo mientras usas mock:
    // Recuperar de localStorage, servicio o mock estático
    const mockPropiedades = [
      {
        precio: 2400,
        nombre: 'St. Crystal',
        ubicacion: 'Florida',
        habitaciones: 4,
        banos: 2,
        tipoEntrada: 'Car',
        mascotas: 'Yes',
        piscina: 'No',
        parrilla: 'Yes',
        descripcion: 'Una hermosa finca para vacaciones',
        imagen: 'assets/images/imagen1.jpg'
      },
      // puedes agregar más
    ];

    this.propiedad = mockPropiedades[+id!]; // Convertir id a número
  }
  guardarCambios() {
  console.log('Propiedad actualizada:', this.propiedad);
  alert('Cambios guardados (simulado)');
}

}
