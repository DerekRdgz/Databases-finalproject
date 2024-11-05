export type Cliente = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string | null;
  createdAt: Date;
  updatedAt: Date;
};