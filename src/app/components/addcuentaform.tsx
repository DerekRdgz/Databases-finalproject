'use client'
import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

type Cuenta = {
  id: number;
  id_cliente: number;
  tipo_cuenta: 'AHORRO' | 'CORRIENTE' | 'NOMINA';
  saldo: number;
  fecha_apertura: string;
  estado: 'ACTIVA' | 'INACTIVA' | 'BLOQUEADA';
};

type Cliente = {
  id: number;
  nombre: string;
  apellido: string;
};

type Props = {
  onCuentaAdded: () => void;
  cuentaToEdit: Cuenta | null;
  onCuentaUpdated: () => void;
};

export default function AddCuentaForm({ onCuentaAdded, cuentaToEdit, onCuentaUpdated }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [formData, setFormData] = useState({
    id_cliente: '',
    tipo_cuenta: 'AHORRO',
    saldo: '0',
    estado: 'ACTIVA'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loadingClientes, setLoadingClientes] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setLoadingClientes(true);
        const response = await fetch('/api/clientes');
        if (!response.ok) {
          throw new Error('Error al cargar los clientes');
        }
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Error:', error);
        setError('Error al cargar los clientes');
      } finally {
        setLoadingClientes(false);
      }
    };
    
    fetchClientes();
  }, []);

  useEffect(() => {
    if (cuentaToEdit) {
      setFormData({
        id_cliente: cuentaToEdit.id_cliente.toString(),
        tipo_cuenta: cuentaToEdit.tipo_cuenta,
        saldo: cuentaToEdit.saldo.toString(),
        estado: cuentaToEdit.estado
      });
    }
  }, [cuentaToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let url = '/api/cuentas';
      let method = 'POST';
      
      if (cuentaToEdit) {
        url = `/api/cuentas/${cuentaToEdit.id}`;
        method = 'PUT';
      }
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_cliente: parseInt(formData.id_cliente),
          tipo_cuenta: formData.tipo_cuenta,
          saldo: parseFloat(formData.saldo),
          estado: formData.estado,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al guardar la cuenta');
      }

      setSuccess(cuentaToEdit ? 'Cuenta actualizada con éxito' : 'Cuenta creada con éxito');
      
      if (cuentaToEdit) {
        onCuentaUpdated();
      } else {
        onCuentaAdded();
      }

      // Solo resetear el form si no estamos editando
      if (!cuentaToEdit) {
        setFormData({
          id_cliente: '',
          tipo_cuenta: 'AHORRO',
          saldo: '0',
          estado: 'ACTIVA'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Error al guardar la cuenta');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar mensajes al modificar el formulario
    setError('');
    setSuccess('');
  };

  if (loadingClientes) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Cargando clientes...</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center">
          <CheckCircle2 className="h-5 w-5 mr-2" />
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cliente *
            </label>
            <select
              name="id_cliente"
              value={formData.id_cliente}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
            >
              <option value="">Seleccionar cliente</option>
              {clientes.length > 0 ? (
                clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nombre} {cliente.apellido}
                  </option>
                ))
              ) : (
                <option value="" disabled>No hay clientes disponibles</option>
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Cuenta *
            </label>
            <select
              name="tipo_cuenta"
              value={formData.tipo_cuenta}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
            >
              <option value="AHORRO">Ahorro</option>
              <option value="CORRIENTE">Corriente</option>
              <option value="NOMINA">Nómina</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Saldo Inicial *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                name="saldo"
                value={formData.saldo}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className="w-full border rounded-md p-2 pl-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado *
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
            >
              <option value="ACTIVA">Activa</option>
              <option value="INACTIVA">Inactiva</option>
              <option value="BLOQUEADA">Bloqueada</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`
              flex items-center justify-center px-4 py-2 rounded-md text-white font-medium
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              }
            `}
          >
            {loading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            )}
            {loading 
              ? 'Guardando...' 
              : cuentaToEdit 
                ? 'Actualizar Cuenta' 
                : 'Crear Cuenta'
            }
          </button>
        </div>
      </form>
    </div>
  );
}