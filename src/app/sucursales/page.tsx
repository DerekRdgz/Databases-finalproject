'use client'
import { useState, useEffect } from 'react';
import AddSucursalForm from '../components/addsucursalform';
import { Sucursal } from '../types/type';

export default function SucursalesPage() {
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSucursal, setEditingSucursal] = useState<Sucursal | null>(null);

  const loadSucursales = async () => {
    try {
      const response = await fetch('/api/sucursales');
      if (!response.ok) {
        throw new Error('Error al cargar las sucursales');
      }
      const data = await response.json();
      setSucursales(data);
    } catch (error) {
      console.error('Error al cargar las sucursales:', error);
    }
  };

  useEffect(() => {
    loadSucursales();
  }, []);

  const handleSucursalAdded = () => {
    loadSucursales();
    setShowForm(false);
  };

  const handleEdit = (sucursal: Sucursal) => {
    setEditingSucursal(sucursal);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta sucursal?')) {
      try {
        const response = await fetch('/api/sucursales', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error('Error al eliminar la sucursal');
        }

        loadSucursales();
      } catch (error) {
        console.error('Error al eliminar la sucursal:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Sucursales</h1>
      
      <button 
        onClick={() => {
          setEditingSucursal(null);
          setShowForm(!showForm);
        }} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {showForm ? 'Cerrar Formulario' : 'Agregar Sucursal'}
      </button>

      {showForm && (
        <AddSucursalForm 
          onSucursalAdded={handleSucursalAdded} 
          sucursalToEdit={editingSucursal}
          onSucursalUpdated={() => {
            loadSucursales();
            setShowForm(false);
            setEditingSucursal(null);
          }}
        />
      )}

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Dirección</th>
            <th className="py-2 px-4 border-b">Teléfono</th>
            <th className="py-2 px-4 border-b">Fecha de Registro</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sucursales.map((sucursal) => (
            <tr key={sucursal.id}>
              <td className="py-2 px-4 border-b">{sucursal.nombre}</td>
              <td className="py-2 px-4 border-b">{sucursal.direccion}</td>
              <td className="py-2 px-4 border-b">{sucursal.telefono}</td>
              <td className="py-2 px-4 border-b">
                {new Date(sucursal.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">
                <button 
                  onClick={() => handleEdit(sucursal)}
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(sucursal.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}