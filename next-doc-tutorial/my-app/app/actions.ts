'use server'
export async function createPost(formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')

  // Update data
  // Revalidate cache
}

export async function incrementLike() {
  return 1
}

export async function incrementViews() {
  return 1
}
