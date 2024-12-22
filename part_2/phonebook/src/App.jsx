import { useState } from 'react'

const Phone = ({person}) => {return (<div>{person.name} {person.number}</div>)}

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)


  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    } else {
      const nameObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }
      console.log("newName", nameObject)
      const updatedPersons = persons.concat(nameObject)
      setPersons(updatedPersons)
      console.log("persons", updatedPersons)      
      setNewName('')
    }
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
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
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
          <Phone key={person.id} person={person}/>
        )}
      </div>
    </div>
  )
}

export default App