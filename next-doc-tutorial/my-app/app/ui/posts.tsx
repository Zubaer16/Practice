import Link from 'next/link'

export default function Posts({ post }: { post: string }) {
  return (
    <ul>
      <li key={'myPost'}>
        <Link prefetch={false} href={`/blog/${post}`}>
          ekhane click korun{' '}
        </Link>
      </li>
    </ul>
  )
}
