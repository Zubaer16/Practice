import { useState } from 'react'

export default function EditProfile() {
  const [firstName, setFirstName] = useState('Jane')
  const [lastName, setLastName] = useState('Jacobs')
  const [displayName, setDisplayName] = useState('')
  const [displayInput, setDisplayInput] = useState('none')
  const [buttonName, setButtonName] = useState('Edit Profile')

  function handleSubmit(e) {
    e.preventDefault()
    if (buttonName === 'Edit Profile') {
      setDisplayName('none')
      setDisplayInput('')
      setButtonName('Save')
    } else if (buttonName === 'Save') {
      setDisplayName('')
      setDisplayInput('none')
      setButtonName('Edit Profile')
    }
  }

  function handleFirstNameChange(e) {
    setFirstName(e.target.value)
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value)
  }

  return (
    <form>
      <label>
        First name: <b style={{ display: displayName }}>{firstName}</b>
        <input
          onChange={handleFirstNameChange}
          style={{ display: displayInput }}
          value={firstName}
        />
      </label>
      <label>
        Last name: <b style={{ display: displayName }}>{lastName}</b>
        <input
          onChange={handleLastNameChange}
          style={{ display: displayInput }}
          value={{ lastName }}
        />
      </label>
      <button onClick={handleSubmit} type="submit">
        {buttonName}
      </button>
      <p>
        <i>
          Hello, {firstName} {lastName}!
        </i>
      </p>
    </form>
  )
}
