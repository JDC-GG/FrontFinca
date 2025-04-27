<<<<<<< HEAD
export class Usuario {
  constructor(
    public id: number,
    public nombre: string,
    public email: string,
    private password: string,
    public rol: 'propietario' | 'cliente'
  ) {}
}
=======
export interface Usuario {
    id?: number;
    nombre: string;
    email: string;
    rol: string;
  }
>>>>>>> Mafe
