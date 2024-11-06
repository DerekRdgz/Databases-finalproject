import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const sucursales = await prisma.sucursal.findMany();
  return NextResponse.json(sucursales);
}

export async function POST(request: Request) {
  const body = await request.json();
  const sucursal = await prisma.sucursal.create({
    data: body,
  });
  return NextResponse.json(sucursal);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, ...data } = body;
  const sucursal = await prisma.sucursal.update({
    where: { id },
    data,
  });
  return NextResponse.json(sucursal);
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { id } = body;
  await prisma.sucursal.delete({
    where: { id },
  });
  return NextResponse.json({ message: 'Sucursal eliminada' });
}