import { useState } from 'react'

const Phone = ({person}) => {return (<div>{person}</div>)}

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      id: persons.length + 1,
      name: newName
    }
    console.log("newName", nameObject)
    setPersons(persons.concat(nameObject))
    console.log("persons", persons)
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
          <Phone key={person.id} person={person.name}/>
        )}
      </div>
    </div>
  )
}

export default App