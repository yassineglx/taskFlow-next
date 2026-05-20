import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Props) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id: Number(id) }
  });
  if (!project) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PUT(request: Request, { params }: Props) {
  const { id } = await params;
  const { name, color } = await request.json();
  const project = await prisma.project.update({
    where: { id: Number(id) },
    data: {
      name,
      ...(color ? { color } : {})
    }
  });
  return NextResponse.json(project);
}

export async function DELETE(request: Request, { params }: Props) {
  const { id } = await params;
  await prisma.project.delete({
    where: { id: Number(id) }
  });
  return NextResponse.json({ message: 'Projet supprimé' });
}
