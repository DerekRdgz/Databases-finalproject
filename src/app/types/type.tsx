export type Cliente = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TipoCuenta = 'AHORRO' | 'CORRIENTE' | 'NOMINA';
export type EstadoCuenta = 'ACTIVA' | 'INACTIVA' | 'BLOQUEADA';

export type Cuenta = {
  id: number;
  id_cliente: number;
  tipo_cuenta: TipoCuenta;
  saldo: number;
  fecha_apertura: string;
  estado: EstadoCuenta;
  createdAt: string;
  updatedAt: string;
  cliente?: {
    nombre: string;
    apellido: string;
  };
};

export interface Sucursal {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  createdAt: string;
  updatedAt: string;
}