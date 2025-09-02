import Link from 'next/link'

export default function Post({ post }: { post: string }) {
  return (
    <ul>
      <li key={'myPost'}>
        <Link href={`/blog/${post}`}>ekhane click korun </Link>
      </li>
    </ul>
  )
}
