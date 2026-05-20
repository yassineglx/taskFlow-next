'use server';

import { revalidatePath } from 'next/cache';

const API_URL = 'http://127.0.0.1:3000/api/projects';

/**
 * CREATE PROJECT
 */
export async function addProject(formData: FormData) {
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;

  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, color }),
  });

  revalidatePath('/dashboard');
}

/**
 * RENAME PROJECT
 */
export async function renameProject(formData: FormData) {
  const id = formData.get('id') as string;
  const newName = (formData.get('newName') || formData.get('name')) as string;
  const color = formData.get('color') as string;

  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: newName,
      color: color || undefined,
    }),
  });

  revalidatePath('/dashboard');
}

/**
 * DELETE PROJECT
 */
export async function deleteProject(formData: FormData) {
  const id = formData.get('id') as string;

  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  revalidatePath('/dashboard');
}