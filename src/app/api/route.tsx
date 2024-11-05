import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const clientes = await prisma.cliente.findMany();
  return NextResponse.json(clientes);
}

export async function POST(request: Request) {
  const body = await request.json();
  const cliente = await prisma.cliente.create({
    data: body,
  });
  return NextResponse.json(cliente);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, ...data } = body;
  const cliente = await prisma.cliente.update({
    where: { id },
    data,
  });
  return NextResponse.json(cliente);
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { id } = body;
  await prisma.cliente.delete({
    where: { id },
  });
  return NextResponse.json({ message: 'Cliente eliminado' });
}