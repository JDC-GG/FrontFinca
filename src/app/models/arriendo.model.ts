// src/app/models/arriendo.model.ts

import { Propiedad } from './propiedad.model';
import { Usuario } from './usuario.model';


export interface arriendo {
  id?: number;                    
  propiedad?: Propiedad;          
  usuario?: Usuario; 
  nombrePropiedad?: string;              
  propiedadId?: number;          
  usuarioId?: number;           

  fechaSolicitud?: string;        
  fechaLlegada?: string;          
  fechaSalida?: string;          

  cantidadPersonas?: number;      
  valorTotal?: number;           

  estado?: string;                
}
