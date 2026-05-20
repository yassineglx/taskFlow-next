import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

function readDB() {
  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  return data;
}

function writeDB(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Props) {
  const { id } = await params;
  const db = readDB();
  const project = db.projects.find((p: any) => p.id === id);
  if (!project) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PUT(request: Request, { params }: Props) {
  const { id } = await params;
  const body = await request.json();
  const db = readDB();
  const index = db.projects.findIndex((p: any) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }
  
  db.projects[index] = {
    ...db.projects[index],
    name: body.name !== undefined ? body.name : db.projects[index].name,
    color: body.color !== undefined ? body.color : db.projects[index].color,
  };
  
  writeDB(db);
  return NextResponse.json(db.projects[index]);
}

export async function DELETE(request: Request, { params }: Props) {
  const { id } = await params;
  const db = readDB();
  const index = db.projects.findIndex((p: any) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }
  db.projects.splice(index, 1);
  writeDB(db);
  return NextResponse.json({ message: 'Projet supprimé' });
}
