'use client';

import { useActionState } from 'react';
import { signup } from '../actions/auth';

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signup, null);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">TaskFlow</h1>
        <p className="auth-subtitle">Créez votre compte collaboratif</p>

        {state?.error && <div className="alert alert-danger">{state.error}</div>}

        <form action={formAction} className="auth-form">
          <div className="form-group">
            <input
              name="name"
              type="text"
              placeholder="Nom complet"
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              placeholder="Mot de passe"
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirmer le mot de passe"
              required
              className="form-control"
            />
          </div>
          <button type="submit" disabled={pending} className="btn-primary">
            {pending ? 'Inscription...' : "S'inscrire"}
          </button>
        </form>

        <p className="auth-footer">
          Déjà un compte ? <a href="/login" className="auth-link">Se connecter</a>
        </p>
      </div>
    </div>
  );
}
