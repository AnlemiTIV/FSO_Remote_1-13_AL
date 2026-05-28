
//3 b)

const cors = require('cors')

const morgan = require('morgan')

const express = require('express')

const app = express()

app.use(cors())
//3.5 varten, uuden puhelinluettelon lisäys
app.use(express.json())

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
    //important: true
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
    //important: true
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
    //important: true
  },
    {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    //important: true
  }
]

const valueA = persons.length

app.use(morgan('tiny'))

app.get("/", (request, response) => {
    response.send("<h1>hello world 3</h1>")
    console.log("/ vaihe ok") //Tulostuu vain jos jätät api/persons pois
})

//3.2 tehtävä
app.get("/info", (request, response) => {
    const currentDateTime = new Date().toString();
    response.send(`
      <p style="font-size: 18px;">Phonebook has info for ${valueA} people</p>
      <p style="font-size: 18px;">${currentDateTime}</p>
      `)
    console.log("info toimii")
})

//varmista että tämä on olemassa, GET All persons
app.get("/api/persons", (request, response) => {
    response.json(persons)
    console.log("note toimii")
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})


//const generateId = () => {
//}

//POST new person 
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const nameDuplicate = persons.some(
    person => person.name.trim().toLowerCase() === body.name.trim().toLowerCase()
  )

  if (nameDuplicate) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const generateId = () => {
    
    const maxId = persons.length > 0
    ? Math.max(...persons.map(person => Number(person.id)))
    : 0
    return String(maxId + 1)
       
    //return Math.floor(Math.random() * 1000000).toString()
  }

  //Oltava 3.6 varten
  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)

  response.json(newPerson)
})

//Deletoi indexi, 3.4 tehtävä
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  
  console.log(`Server running on port ${PORT}`)
})


