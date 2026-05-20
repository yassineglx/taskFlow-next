'use client';

import { logoutAction } from '../actions/auth';

export default function LogoutButton() {
  return (
    <form action={logoutAction} style={{ display: 'inline' }}>
      <button
        type="submit"
        className="btn-secondary"
        style={{
          padding: '0.5rem 1rem',
          fontSize: '0.9rem',
          cursor: 'pointer',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          color: '#f87171',
          background: 'rgba(239, 68, 68, 0.05)'
        }}
      >
        Déconnexion
      </button>
    </form>
  );
}
