export class Usuario {
  constructor(
    public id: number,
    public nombre: string,
    public email: string,
    private password: string,
    public rol: 'propietario' | 'cliente'
  ) {}
}
