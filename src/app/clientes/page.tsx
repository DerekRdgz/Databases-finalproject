'use client'
import { useState, useEffect } from 'react';
import AddClienteForm from '../components/addclientform';
import { Cliente } from '../types/type';

export default function ClientsPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);

  const loadClientes = async () => {
    try {
      const response = await fetch('/api/clientes');
      if (!response.ok) {
        throw new Error('Error al cargar los clientes');
      }
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Error al cargar los clientes:', error);
    }
  };

  useEffect(() => {
    loadClientes();
  }, []);

  const handleClienteAdded = () => {
    loadClientes();
    setShowForm(false);
  };

  const handleEdit = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      try {
        const response = await fetch('/clientes', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el cliente');
        }

        loadClientes();
      } catch (error) {
        console.error('Error al eliminar el cliente:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
      
      <button 
        onClick={() => {
          setEditingCliente(null);
          setShowForm(!showForm);
        }} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {showForm ? 'Cerrar Formulario' : 'Agregar Cliente'}
      </button>

      {showForm && (
        <AddClienteForm 
          onClienteAdded={handleClienteAdded} 
          clienteToEdit={editingCliente}
          onClienteUpdated={() => {
            loadClientes();
            setShowForm(false);
            setEditingCliente(null);
          }}
        />
      )}

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Teléfono</th>
            <th className="py-2 px-4 border-b">Fecha de Registro</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td className="py-2 px-4 border-b">{`${cliente.nombre} ${cliente.apellido}`}</td>
              <td className="py-2 px-4 border-b">{cliente.email}</td>
              <td className="py-2 px-4 border-b">{cliente.telefono ?? 'No proporcionado'}</td>
              <td className="py-2 px-4 border-b">{new Date(cliente.createdAt).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">
                <button 
                  onClick={() => handleEdit(cliente)}
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(cliente.id)}
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