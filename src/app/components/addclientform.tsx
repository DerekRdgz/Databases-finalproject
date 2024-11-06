'use client'
import { useState, useEffect } from 'react';
import { Cliente } from '../types/type'; 


type Props = {
  onClienteAdded: () => void;
  clienteToEdit: Cliente | null;
  onClienteUpdated: () => void;
};

export default function AddClienteForm({ onClienteAdded, clienteToEdit, onClienteUpdated }: Props) {
  const [formData, setFormData] = useState<Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
  });

  useEffect(() => {
    if (clienteToEdit) {
      setFormData({
        ...clienteToEdit,
        telefono: clienteToEdit.telefono || '' // Convertimos null a string vacío
      });
    }
  }, [clienteToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = '/api/clientes';
      const method = clienteToEdit ? 'PUT' : 'POST';
      const body = clienteToEdit ? JSON.stringify({ ...formData, id: clienteToEdit.id }) : JSON.stringify(formData);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (!response.ok) {
        throw new Error('Error al guardar el cliente');
      }

      if (clienteToEdit) {
        onClienteUpdated();
      } else {
        onClienteAdded();
      }

      setFormData({ nombre: '', apellido: '', email: '', telefono: '' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
        className="border p-2 mr-2"
      />
      <input
        type="text"
        name="apellido"
        value={formData.apellido}
        onChange={handleChange}
        placeholder="Apellido"
        required
        className="border p-2 mr-2"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="border p-2 mr-2"
      />
      <input
        type="text"
        name="telefono"
        value={formData.telefono || ''} // Aseguramos que nunca sea null
        onChange={handleChange}
        placeholder="Teléfono"
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        {clienteToEdit ? 'Actualizar Cliente' : 'Agregar Cliente'}
      </button>
    </form>
  );
}