import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function createPost(prevState: any, formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  try {
    const res = await fetch('https://api.vercel.app/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })

    const json = await res.json()

    if (!res.ok) {
      return {
        message: `Failed to create post: ${res.statusText}`,
        error: true,
        data: null,
      }
    }

    return { message: 'Post created successfully', error: false, data: json }
  } catch (error) {
    return {
      message: `Error: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
      error: true,
      data: null,
    }
  }
}

export async function deletePost(formData: FormData) {
  'use server'
  const id = formData.get('id')

  // Update data
  // Revalidate data
}

export async function exampleAction() {
  const cookieStore = await cookies()

  // Get cookie
  cookieStore.get('name')?.value

  // Set cookie
  cookieStore.set('name', 'Delba')

  // Delete cookie
  cookieStore.delete('name')
}
