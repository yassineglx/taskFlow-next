'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Veuillez remplir tous les champs' };
  }

  // Find user in Prisma
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user || user.password !== password) {
    return { error: 'Email ou mot de passe incorrect' };
  }

  const cookieStore = await cookies();
  cookieStore.set('session', JSON.stringify({
    id: user.id, email: user.email, name: user.name
  }), {
    httpOnly: true,
    secure: false,
    maxAge: 3600,
    path: '/',
  });

  redirect('/dashboard');
}

export async function signup(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!name || !email || !password || !confirmPassword) {
    return { error: 'Veuillez remplir tous les champs' };
  }

  if (password !== confirmPassword) {
    return { error: 'Les mots de passe ne correspondent pas' };
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { error: 'Cet email est déjà utilisé' };
    }

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    });

    const cookieStore = await cookies();
    cookieStore.set('session', JSON.stringify({
      id: newUser.id, email: newUser.email, name: newUser.name
    }), {
      httpOnly: true,
      secure: false,
      maxAge: 3600,
      path: '/',
    });

  } catch (error: any) {
    return { error: `Erreur lors de l'inscription : ${error.message}` };
  }

  redirect('/dashboard');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/login');
}
