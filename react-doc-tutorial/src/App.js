import { useRef } from 'react'
export default function Page() {
  const ref = useRef(null)
  function handleClick() {
    ref.current.focus()
  }
  return (
    <>
      <nav>
        <button onClick={handleClick}>Search</button>
      </nav>
      <input placeholder="Looking for something?" ref={ref} />
    </>
  )
}
