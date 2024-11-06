// src/app/api/cuentas/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();

    const cuenta = await prisma.cuenta.update({
      where: { id },
      data: {
        id_cliente: data.id_cliente,
        tipo_cuenta: data.tipo_cuenta,
        saldo: parseFloat(data.saldo),
        estado: data.estado,
      },
      include: {
        cliente: {
          select: {
            nombre: true,
            apellido: true,
          },
        },
      },
    });

    return NextResponse.json(cuenta);
  } catch (error) {
    console.error('Error al actualizar cuenta:', error);
    return NextResponse.json(
      { error: 'Error al actualizar la cuenta' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    await prisma.cuenta.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Cuenta eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar cuenta:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la cuenta' },
      { status: 500 }
    );
  }
}