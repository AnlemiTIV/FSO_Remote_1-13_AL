import { useState, useEffect } from 'react'

import Filter from './components/filter'
import Persons from './components/persons'
import PersonForm from './components/personForm'

import axiosLogic from './services/axios-logic'
import Notification from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null) //Update this whenever person is added/deleted/number changed
  const [messageType, setMessageType] = useState(null) //Error, Success (Red, Green Css)

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

  const changePerson = persons.find(p => p.name === newName)

  if (changePerson) {
    if (window.confirm(`${newName} is already added. Replace the old number?`)) {
      const updatedPerson = { ...changePerson, number: newNumber }

      axiosLogic
        .update(changePerson.id, updatedPerson)
        .then(response => {
          setPersons(persons.map(p =>
            p.id !== changePerson.id ? p : response.data
          ))

          setErrorMessage(`Updated ${newName}`)
          setMessageType('success')

          setTimeout(() => {
            setErrorMessage(null)
            setMessageType(null)
          }, 3000)

          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(`Error updating ${newName}`)
          setMessageType('error')
          setTimeout(() => {
            setErrorMessage(null)
            setMessageType(null)
          }, 3000)
        })

    } else {
      setNewName('')
      setNewNumber('')
    }
    return
  }

  const personObject = { name: newName, number: newNumber }

  axiosLogic
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(response.data))

      setErrorMessage(`Added ${newName}`)
      setMessageType('success')

      setTimeout(() => {
        setErrorMessage(null)
        setMessageType(null)
      }, 3000)

      setNewName('')
      setNewNumber('')
    })
    .catch(error => {
      setErrorMessage(`Error adding ${newName}`)
      setMessageType('error')
      setTimeout(() => {
        setErrorMessage(null)
        setMessageType(null)
      }, 3000)
    })
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
        
        setMessageType("error")
        setErrorMessage(`Deleted ${name}`)
        setTimeout(() => {
          setErrorMessage(null)
          setMessageType(null)
        }, 3000)
      })
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={messageType}/>

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
  )}


export default App


