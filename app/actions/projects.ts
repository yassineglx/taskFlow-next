'use server';

import { revalidatePath } from 'next/cache';

const API_URL = 'http://127.0.0.1:4000/projects';

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
 * - receives id + newName
 * - must send full object (name + color)
 */
export async function renameProject(formData: FormData) {
  const id = formData.get('id') as string;
  const newName = formData.get('newName') as string;
  const color = formData.get('color') as string;

  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: newName,
      color,
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