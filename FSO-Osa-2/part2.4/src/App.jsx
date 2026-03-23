import { useState, useEffect } from 'react'

import Filter from './components/filter'
import Persons from './components/persons'
import PersonForm from './components/personForm'

import axiosLogic from './services/axios-logic'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  //C):ssä lisätty, haetaan tiedot db.json tiedostosta, JSON Serveristä
  useEffect(() => {
    axiosLogic
    .getUrl()
    .then(response => {
      setPersons(response.data)
    })
  },[])
  
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
    
    axiosLogic
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(response.data))
    })
    setNewName('')
    setNewNumber('')
  }

  const nameHandle = (event) => {
    setNewName(event.target.value) 
  }

  const numberHandle = (event) => {
    setNewNumber(event.target.value)
  }
  
  const deleteTarget = (id, name) => {
    
    if (window.confirm(`Delete ${name}?`)) {
      axiosLogic
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
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
      
      <Persons persons={personsToShow} deleteTarget={deleteTarget}/> 
      
      
    </div>
  )
}

export default App