import { useState } from 'react'
import { sculptureList } from './data.js'

export default function Gallery() {
  const [index, setIndex] = useState(0)
  const [showMore, setShowMore] = useState(false)

  function handleNextClick() {
    setIndex(index + 1)
  }

  function handlePreviousClick() {
    setIndex(index - 1)
  }

  function handleMoreClick() {
    setShowMore(!showMore)
  }

  let sculpture = sculptureList[index]
  return (
    <>
      <button onClick={handleNextClick} disabled={index === 11}>
        Next
      </button>
      <button onClick={handlePreviousClick} disabled={index === 0}>
        Previous
      </button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt} />
    </>
  )
}
