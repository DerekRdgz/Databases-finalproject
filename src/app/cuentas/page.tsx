'use client'
import { useState, useEffect } from 'react';
import AddCuentaForm from '../components/addcuentaform';

type Cuenta = {
  id: number;
  id_cliente: number;
  tipo_cuenta: 'AHORRO' | 'CORRIENTE' | 'NOMINA';
  saldo: number;
  fecha_apertura: string;
  estado: 'ACTIVA' | 'INACTIVA' | 'BLOQUEADA';
  cliente?: {
    nombre: string;
    apellido: string;
  };
};

export default function CuentasPage() {
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCuenta, setEditingCuenta] = useState<Cuenta | null>(null);

  const loadCuentas = async () => {
    try {
      const response = await fetch('/api/cuentas');
      if (!response.ok) throw new Error('Error al cargar las cuentas');
      const data = await response.json();
      setCuentas(data);
    } catch (error) {
      console.error('Error al cargar las cuentas:', error);
    }
  };

  useEffect(() => {
    loadCuentas();
  }, []);

  const handleCuentaAdded = () => {
    loadCuentas();
    setShowForm(false);
  };

  const handleEdit = (cuenta: Cuenta) => {
    setEditingCuenta(cuenta);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta cuenta?')) return;
    
    try {
      const response = await fetch(`/api/cuentas/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar la cuenta');
      loadCuentas();
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cuentas Bancarias</h1>
      
      <button 
        onClick={() => {
          setEditingCuenta(null);
          setShowForm(!showForm);
        }} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {showForm ? 'Cerrar Formulario' : 'Crear Nueva Cuenta'}
      </button>

      {showForm && (
        <AddCuentaForm 
          onCuentaAdded={handleCuentaAdded} 
          cuentaToEdit={editingCuenta}
          onCuentaUpdated={() => {
            loadCuentas();
            setShowForm(false);
            setEditingCuenta(null);
          }}
        />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Titular</th>
              <th className="py-2 px-4 border-b">Tipo de Cuenta</th>
              <th className="py-2 px-4 border-b">Saldo</th>
              <th className="py-2 px-4 border-b">Estado</th>
              <th className="py-2 px-4 border-b">Fecha Apertura</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cuentas.map((cuenta) => (
              <tr key={cuenta.id}>
                <td className="py-2 px-4 border-b">
                  {cuenta.cliente ? `${cuenta.cliente.nombre} ${cuenta.cliente.apellido}` : 'N/A'}
                </td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded text-sm ${
                    cuenta.tipo_cuenta === 'AHORRO' ? 'bg-green-100 text-green-800' :
                    cuenta.tipo_cuenta === 'CORRIENTE' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {cuenta.tipo_cuenta}
                  </span>
                </td>
                <td className="py-2 px-4 border-b font-mono">
                  {formatCurrency(cuenta.saldo)}
                </td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded text-sm ${
                    cuenta.estado === 'ACTIVA' ? 'bg-green-100 text-green-800' :
                    cuenta.estado === 'INACTIVA' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {cuenta.estado}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(cuenta.fecha_apertura).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  <button 
                    onClick={() => handleEdit(cuenta)}
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(cuenta.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}