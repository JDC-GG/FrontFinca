import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import axios from 'axios';
import { Usuario } from '../models /Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  getPipols():Observable <Usuario[]>{
    return of(
      [
        new Usuario("Pablo", "Márquez"),
        new Usuario("María", "Pacheco"),
        new Usuario("Francisco", "Márquez"),
        new Usuario("Miguel", "Márquez"),
        new Usuario("José", "Márquez"),
      ]
    );
  }

  getPipolsExternos():Promise <Usuario[]>{
    return axios.get<Usuario[]>('http://localhost:8080/api/javeriana/estudiante/estudiante').then(
      response => response.data
    ).catch((error) => {
      console.error('Error fetching data:', error);
      return [];
    }
    );
  }
}

