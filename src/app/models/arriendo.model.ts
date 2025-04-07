export interface Arriendo {
    id: number;
    propiedadId: number;
    usuarioId: number;
    fechaInicio: Date;
    fechaFin: Date;
    estado: 'pendiente' | 'aprobado' | 'rechazado';
  }