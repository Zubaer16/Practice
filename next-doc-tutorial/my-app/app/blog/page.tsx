import Posts from '@/app/ui/posts'
import { Suspense } from 'react'

export default function Page() {
  //  Don't await the data fetching function
  const posts = getPosts()
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <Posts post={posts}></Posts>
    </Suspense>
  )
}

export function getPosts() {
  return 'hi'
}
