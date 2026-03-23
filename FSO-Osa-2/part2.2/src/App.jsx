import { useState } from 'react'

const Filter = ({filter, filterChange}) => {
  return (
  <div>filter shown with<input value={filter} onChange={filterChange}/></div>
)}

const PersonForm = ({addName, newName, newNumber, nameHandle, numberHandle}) => {

  return (
  <form onSubmit={addName}>
    <div>name: <input value={newName} onChange={nameHandle}/></div>
    <div>number: <input value={newNumber} onChange={numberHandle}/></div>
    <div>
      <button type="submit">add</button>
      </div>
      </form>
      )
    }

const Persons = ({persons}) => {

  return (
  <div>
    {persons.map(person => 
    <p key={person.name}>{person.name} {person.number}</p>
    )}
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  const filterChange = (event) => {
  setFilter(event.target.value)
}

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const addName = (event) => { 
    event.preventDefault()
    
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    
    const personObject = { name: newName, number: newNumber}  
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const nameHandle = (event) => {
    setNewName(event.target.value) 
  }

  const numberHandle = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} filterChange={filterChange}/>

      <h2>add a new</h2>

      <PersonForm
      addName={addName}
      newName={newName}
      newNumber={newNumber}
      nameHandle={nameHandle}
      numberHandle={numberHandle}
      />

      <h2>Numbers</h2>
      
      <Persons persons={personsToShow} />
      
    </div>
  )
}

export default App