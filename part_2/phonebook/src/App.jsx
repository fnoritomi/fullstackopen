import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [msgType, setMsgType] = useState(null)

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => setFilter(event.target.value)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log(initialPersons)
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = filter === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name.toLowerCase()  === newName.toLowerCase())
    if (existingPerson !== undefined) {
      if (window.confirm(`${existingPerson.name} already is already added to the phonebook. replace the old number with the new one?`)) {
        const changedPerson = { ...existingPerson, number:newNumber}
        personService
          .updateNumber(changedPerson.id, changedPerson)
          .then(updatedPerson => {
            const updatedPersons = persons.map(oldPerson => oldPerson.id === updatedPerson.id ? updatedPerson : oldPerson)
            setPersons(updatedPersons)
            setNewName('')
            setNewNumber('')
            setMsgType('success')
            setMessage(updatedPerson.name)
            setTimeout(() => {
              setMessage(null)
              setMsgType(null)
              }, 5000)    
          })
      }
    } else {
      const personObject = {
        id: String(persons.length + 1),
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(createdPerson => {
          const updatedPersons = persons.concat(createdPerson)
          setPersons(updatedPersons)
          setNewName('')
          setNewNumber('')
          setMessage(createdPerson.name)          
          setMsgType('success')
          setTimeout(() => {
            setMessage(null)
            setMsgType(null)
            }, 5000)    
        })
    }
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .catch(error => {
          setMessage(`Information of ${person.name} has already been removed from server`)          
          setMsgType('error')
          setTimeout(() => {
            setMessage(null)
            setMsgType(null)
          }, 5000)
        })        
        const updatedPersons = persons.filter(p => p.id !== id)
        setPersons(updatedPersons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} msgType={msgType} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons 
        personsToShow={personsToShow} 
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App