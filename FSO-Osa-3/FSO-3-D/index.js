
//3 d)

//persons.js omasta modules hakemistosta

//app.use(express.static(path.join(__dirname, "build")));

require('dotenv').config()

const Person = require('./own_models/persons')

const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const app = express()

app.use(cors())
//3.5 varten, uuden puhelinluettelon lisäys
app.use(express.json())


//3-B, database code

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

app.use(morgan('tiny'))

//varmista että tämä on olemassa, GET All persons
//3-B muokkaus
app.get('/api/persons', (request, response) => {
  console.log('app.get api/person toimii')
  Person.find({}).then(persons => {
    response.json(persons)
  })

})

app.get('/api/persons/:id', (request, response, next) => {

  console.log('app.get id one, toimii')
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

//POST new person
//3-C muokkaus
app.post('/api/persons', (request, response, next) => {

  console.log(request.body)

  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  //Oltava 3.6 varten
  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  //persons = persons.concat(newPerson)
  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

//Deletoi indexi, 3.4 tehtävä
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

//Päivitä henkilö/numero
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
