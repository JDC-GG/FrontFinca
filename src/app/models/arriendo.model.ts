import { Propiedad } from './propiedad.model';
import { Usuario } from './usuario.model';

export interface arriendo {
  id?: number;
  propiedad: Propiedad;
  usuario: Usuario;
  fechaSolicitud: Date | string;
  estado: string;
}