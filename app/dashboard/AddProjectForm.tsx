'use client';

import { useFormStatus } from 'react-dom';
import { addProject } from '../actions/projects';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary" style={{ width: '100%' }}>
      {pending ? 'Création...' : '+ Créer le projet'}
    </button>
  );
}

export default function AddProjectForm() {
  return (
    <div className="panel-card">
      <h3 className="panel-title">Nouveau Projet</h3>
      <form action={addProject} className="auth-form">
        <div className="form-group">
          <input
            name="name"
            placeholder="Nom du projet"
            required
            className="form-control"
          />
        </div>
        <div className="form-group" style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <label htmlFor="color-input" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Couleur :</label>
          <input
            id="color-input"
            name="color"
            type="color"
            defaultValue="#3498db"
            className="form-control"
            style={{ width: 60, height: 40, padding: '2px', border: 'none', cursor: 'pointer' }}
          />
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}
