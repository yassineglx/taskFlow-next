import AddProjectForm from './AddProjectForm';
import { renameProject, deleteProject } from '../actions/projects';

export default async function DashboardPage() {
  const res = await fetch('http://127.0.0.1:3000/api/projects', {
    cache: 'no-store',
  });

  const projects = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>

      <AddProjectForm />

      <ul>
        {projects.map((p: any) => (
          <li
            key={p.id}
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            {/* color dot */}
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: p.color,
                display: 'inline-block',
              }}
            />

            {/* project link */}
            <a href={`/projects/${p.id}`}>{p.name}</a>

            {/* rename form */}
            <form action={renameProject} style={{ display: 'flex', gap: 4 }}>
              <input type="hidden" name="id" value={p.id} />
              <input
                type="text"
                name="name"
                placeholder="Rename"
                style={{ padding: '2px 6px' }}
              />
              <button type="submit">✏️</button>
            </form>

            {/* delete form */}
            <form action={deleteProject} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={p.id} />
              <button
                type="submit"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                🗑️
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}