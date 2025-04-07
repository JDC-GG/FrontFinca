import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Arriendo } from '../../models/arriendo.model';

@Injectable({
  providedIn: 'root'
})
export class ArriendoService {
  constructor(private api: ApiService) { }

  getArriendos() {
    return this.api.get<Arriendo[]>('arriendos');
  }

  crearSolicitud(arriendo: Arriendo) {
    return this.api.post<Arriendo>('arriendos', arriendo);
  }
}