// app/layout.tsx
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import './globals.css';
import LogoutButton from './components/LogoutButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'Gestion de projets collaboratifs',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  const user = session ? JSON.parse(session.value) : null;

  return (
    <html lang="fr">
      <body className={inter.className}>
        <header className="app-header">
          <a href="/" className="logo-text">TaskFlow</a>
          <div className="header-user-zone">
            {user ? (
              <>
                <span className="header-username">{user.name}</span>
                <LogoutButton />
              </>
            ) : (
              <a href="/login" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Connexion</a>
            )}
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}