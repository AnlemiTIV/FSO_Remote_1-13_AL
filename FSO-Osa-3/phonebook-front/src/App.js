import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const baseURL = '/api/persons' 
  //'http://localhost:3001/api/persons' //https://23gx5t-3001.csb.app/api/persons

  useEffect(() => {
    axios.get(baseURL) 
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    axios.post(baseURL, personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        
        setTimeout(() => {
          setErrorMessage(null)
        }, 8000)
      })
    }

  const removePerson = (id) => {
    axios.delete(`${baseURL}/${id}`)
    .then(() => {
      setPersons(
        persons.filter(person => person.id !== id)
      )
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      {errorMessage && <div className="error">{errorMessage}</div>}

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.id}>
            {person.name} {person.number}
            
            <button onClick={() => removePerson(person.id)}>
              delete
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App