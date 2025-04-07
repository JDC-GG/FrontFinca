import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Propiedad } from '../../models/propiedad.model';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {
  constructor(private api: ApiService) { }

  getPropiedades() {
    return this.api.get<Propiedad[]>('propiedades');
  }

  createPropiedad(propiedad: Propiedad) {
    return this.api.post<Propiedad>('propiedades', propiedad);
  }
}