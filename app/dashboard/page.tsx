import { prisma } from '@/lib/prisma';
import AddProjectForm from './AddProjectForm';
import { renameProject, deleteProject } from '../actions/projects';
import React from 'react';

export default async function DashboardPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 className="dashboard-title">Mon Dashboard</h1>
      <p className="dashboard-stats">Vous gérez actuellement {projects.length} projet{projects.length !== 1 ? 's' : ''}</p>

      <div className="dashboard-grid">
        <aside className="control-panel">
          <AddProjectForm />
        </aside>

        <section>
          {projects.length === 0 ? (
            <div className="panel-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Aucun projet pour le moment.</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Utilisez le panneau de gauche pour créer votre premier projet.</p>
            </div>
          ) : (
            <ul className="projects-list">
              {projects.map((p) => (
                <li key={p.id} className="project-card">
                  <div className="project-card-header">
                    <span
                      className="project-color-dot"
                      style={{
                        background: p.color,
                        '--dot-color': p.color,
                      } as React.CSSProperties}
                    />
                    <a href={`/projects/${p.id}`} className="project-link-title">
                      {p.name}
                    </a>
                  </div>

                  <div className="project-card-actions">
                    {/* Inline rename form */}
                    <form action={renameProject} className="inline-edit-form">
                      <input type="hidden" name="id" value={p.id} />
                      <input
                        name="newName"
                        placeholder="Renommer..."
                        required
                        className="form-control"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem', flex: 1 }}
                      />
                      <button type="submit" className="btn-icon" title="Sauvegarder le nom">
                        ✏️
                      </button>
                    </form>

                    {/* Delete button */}
                    <form action={deleteProject} style={{ display: 'inline' }}>
                      <input type="hidden" name="id" value={p.id} />
                      <button type="submit" className="btn-icon btn-icon-danger" title="Supprimer le projet">
                        🗑️
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}