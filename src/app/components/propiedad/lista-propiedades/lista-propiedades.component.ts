import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-lista-propiedades',
  templateUrl: './lista-propiedades.component.html',
  styleUrls: ['./lista-propiedades.component.css']
})
export class ListaPropiedadesComponent {
  propiedades = [
    {
      precio: 2015,
      titulo: 'Palm Harbor',
      direccion: '2699 Green Valley, Highland Lake, FL',
      imagen: 'assets/images/imagen1.jpg'
    },
    {
      precio: 1850,
      titulo: 'Lakeview Haven',
      direccion: '1301 Hilltop Rd, Lakeview, CO',
      imagen: 'assets/images/imagen2.jpg'
    }
  ];

  editandoIndex: number | null = null;

  // Valores temporales para edición
  tempPrecio = 0;
  tempTitulo = '';
  tempDireccion = '';

constructor(private router: Router) {}
irADetalle(index: number) {
  const propiedad = this.propiedades[index];
  this.router.navigate(['/propiedad', index]);
}


  editarPropiedad(index: number) {
    this.editandoIndex = index;

    const propiedad = this.propiedades[index];
    this.tempPrecio = propiedad.precio;
    this.tempTitulo = propiedad.titulo;
    this.tempDireccion = propiedad.direccion;
  }

  guardarEdicion() {
    if (this.editandoIndex !== null) {
      this.propiedades[this.editandoIndex] = {
        ...this.propiedades[this.editandoIndex],
        precio: this.tempPrecio,
        titulo: this.tempTitulo,
        direccion: this.tempDireccion
      };
      this.editandoIndex = null;
    }
  }

  cancelarEdicion() {
    this.editandoIndex = null;
  }
}

/*onstructor(private propiedadService: PropiedadService) {} >

  ngOnInit() {
    this.propiedadService.getPropiedades().subscribe({
      next: (data) => this.propiedades = data,
      error: (err) => console.error('Error al cargar propiedades', err)
    });
  }
}
*/  