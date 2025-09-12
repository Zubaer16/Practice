import { Suspense } from 'react'

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  //Get user information

  const artist = await getArtist(username)

  return (
    <>
      <h1>{artist.name}</h1>
      {/* Show fallback UI while the playlists component is loading */}
      <Suspense fallback={<div>Loading....</div>}>
        <PlayLists artistID={artist.id} />
      </Suspense>
    </>
  )
}

async function PlayLists({ artistID }: { artistID: string }) {
  // Use the artist ID to fetch playlists
  const playlists = await getArtistPlayLists(artistID)
  return (
    <ul>
      {playlists.map((playlist: { id: string; name: string }) => (
        <li key={playlist.id}>{playlist.name}</li>
      ))}
    </ul>
  )
}

async function getArtistPlayLists(artistID: string) {
  const playlists = [
    {
      id: 'adsf3e2rfdsf',
      name: 'Zubaer',
    },
    {
      id: 'adsfaef3rdfas',
      name: 'rahat ',
    },
  ]
  return playlists
}

async function getArtist(username: string) {
  const artistName = {
    id: 'adfads',
    name: 'zubaer',
  }

  return artistName
}
