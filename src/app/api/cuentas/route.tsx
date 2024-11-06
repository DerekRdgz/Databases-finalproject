// app/api/cuentas/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cuentas = await prisma.cuenta.findMany({
      include: {
        cliente: {
          select: {
            nombre: true,
            apellido: true,
          },
        },
      },
      orderBy: {
        fecha_apertura: 'desc',
      },
    });

    return NextResponse.json(cuentas);
  } catch (error) {
    console.error('Error al obtener cuentas:', error);
    return NextResponse.json(
      { error: 'Error al obtener las cuentas' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const cuenta = await prisma.cuenta.create({
      data: {
        id_cliente: data.id_cliente,
        tipo_cuenta: data.tipo_cuenta,
        saldo: data.saldo,
        estado: data.estado,
        fecha_apertura: new Date(),
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
    console.error('Error al crear cuenta:', error);
    return NextResponse.json(
      { error: 'Error al crear la cuenta' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    const cuenta = await prisma.cuenta.update({
      where: { id },
      data: updateData,
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

export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    const { id } = data;

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