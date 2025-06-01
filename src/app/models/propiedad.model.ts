// src/app/models/propiedad.model.ts
export interface Propiedad {
  id: number;
  nombre: string;
  departamento: string;
  municipio: string;
  descripcion: string;
  habitaciones: number;
  banos: number;
  mascotas: boolean;
  piscina: boolean;
  asador: boolean;
  valorNoche: number;
  tipoIngreso: string;    
  status: string;  
  idUsuario: number;           
}
