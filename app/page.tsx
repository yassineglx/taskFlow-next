export default function Home() {
  return (
    <div className="hero-container">
      <h1 className="hero-title">Gérez vos projets avec élégance</h1>
      <p className="hero-subtitle">
        TaskFlow est l'outil ultime de gestion de projets pour les équipes modernes. Simplifiez vos tâches, organisez vos sprints et collaborez en temps réel.
      </p>
      <div className="hero-actions">
        <a href="/login" className="btn-primary" style={{ padding: '0.875rem 2rem' }}>
          Se connecter
        </a>
        <a href="/signup" className="btn-secondary" style={{ padding: '0.875rem 2rem' }}>
          Créer un compte
        </a>
      </div>
    </div>
  );
}