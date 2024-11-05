// pages/api/clientes.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { nombre, apellido, email, telefono } = req.body;
      const newCliente = await prisma.cliente.create({
        data: {
          nombre,
          apellido,
          email,
          telefono,
        },
      });
      res.status(201).json(newCliente);
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      res.status(400).json({ error: 'Error al crear el cliente' });
    }
  } else if (req.method === 'GET') {
    try {
      const clientes = await prisma.cliente.findMany();
      res.status(200).json(clientes);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
      res.status(500).json({ error: 'Error al obtener los clientes' });
    }
  } else if (req.method === 'PUT') {
    // Actualizar cliente
    const { id, ...data } = req.body;
    try {
      const updatedCliente = await prisma.cliente.update({
        where: { id: Number(id) },
        data,
      });
      res.status(200).json(updatedCliente);
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
  } else if (req.method === 'DELETE') {
    // Eliminar cliente
    const { id } = req.body;
    try {
      await prisma.cliente.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ message: 'Cliente eliminado con éxito' });
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
      res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}