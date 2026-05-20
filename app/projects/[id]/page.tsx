import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react';

// Pré-générer les pages au build
export async function generateStaticParams() {
  const projects = await prisma.project.findMany();
  return projects.map(p => ({ id: String(p.id) }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id: Number(id) }
  });

  if (!project) notFound();

  return (
    <div className="project-detail-container">
      <div className="project-detail-header">
        <span
          className="project-color-dot"
          style={{
            width: 24,
            height: 24,
            background: project.color,
            '--dot-color': project.color,
          } as React.CSSProperties}
        />
        <h1 className="project-detail-title">{project.name}</h1>
      </div>

      <div className="project-detail-meta">
        <p>Identifiant de projet : <strong>#{project.id}</strong></p>
        <p style={{ marginTop: '0.5rem' }}>Date de création : <strong>{project.createdAt.toLocaleDateString('fr-FR')}</strong></p>
      </div>

      <a href="/dashboard" className="btn-back">
        ← Retour au Dashboard
      </a>
    </div>
  );
}