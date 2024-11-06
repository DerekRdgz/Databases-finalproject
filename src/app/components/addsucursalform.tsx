'use client'
import { useState, useEffect } from 'react';
import { Sucursal } from '../types/type';

type Props = {
  onSucursalAdded: () => void;
  sucursalToEdit: Sucursal | null;
  onSucursalUpdated: () => void;
};

export default function AddSucursalForm({ onSucursalAdded, sucursalToEdit, onSucursalUpdated }: Props) {
  const [formData, setFormData] = useState<Omit<Sucursal, 'id' | 'createdAt' | 'updatedAt'>>({
    nombre: '',
    direccion: '',
    telefono: '',
  });

  useEffect(() => {
    if (sucursalToEdit) {
      setFormData({
        nombre: sucursalToEdit.nombre,
        direccion: sucursalToEdit.direccion,
        telefono: sucursalToEdit.telefono,
      });
    }
  }, [sucursalToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = '/api/sucursales';
      const method = sucursalToEdit ? 'PUT' : 'POST';
      const body = sucursalToEdit 
        ? JSON.stringify({ ...formData, id: sucursalToEdit.id }) 
        : JSON.stringify(formData);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (!response.ok) {
        throw new Error('Error al guardar la sucursal');
      }

      if (sucursalToEdit) {
        onSucursalUpdated();
      } else {
        onSucursalAdded();
      }

      setFormData({ nombre: '', direccion: '', telefono: '' });
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
        placeholder="Nombre de la Sucursal"
        required
        className="border p-2 mr-2"
      />
      <input
        type="text"
        name="direccion"
        value={formData.direccion}
        onChange={handleChange}
        placeholder="Dirección"
        required
        className="border p-2 mr-2"
      />
      <input
        type="tel"
        name="telefono"
        value={formData.telefono}
        onChange={handleChange}
        placeholder="Teléfono"
        required
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        {sucursalToEdit ? 'Actualizar Sucursal' : 'Agregar Sucursal'}
      </button>
    </form>
  );
}