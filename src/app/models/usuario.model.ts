export interface Usuario {
  id?: number;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;         
  contrasena: string;    
  rol?: string;          
}