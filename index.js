const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status - :response-time ms :req-body'))
app.use(express.static('build'))

morgan.token('req-body', (req, res) => JSON.stringify(req.body));

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  
  const person = persons.find(person => person.id == id)
  if(person){
    response.json(person)
  }
  else {
    response.status(404).json("not found!")
  }
})

app.get('/api/info', (request, response) => {
  const now = new Date()
  response.send( 
    `<p>Phonebook has info for 2 people</p><p>${now}</p>`
  )
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const generateId = () => Math.floor(Math.random(100) * 100)

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }

  const existingPerson = persons.find(person => person.name === body.name)
  const existingNumber = persons.find(person => person.number === body.number)
  if (existingPerson) {
    if (existingNumber) {
      return response.status(400).json({ 
        error: 'number must be unique' 
      })
    }
    else return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }


  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)