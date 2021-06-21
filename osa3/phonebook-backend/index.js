const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan(function(tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)

    ].join(' ')
}))


let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-532523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.post('/api/persons', (req, res) => {
    const id = Math.floor(Math.random()*(1000-1)+1) // Generates random number from 1 to 1000
    const body = req.body

    if(!body.name){
        return res.status(400).json({
            error: 'name missing'
        })
    }
    
    if(!body.number){
        return res.status(400).json({
            error: 'number missing'
        })
    }

    if(persons.find(person => person.name === body.name)){
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: id,
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)

    res.status(200).json(person)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const found = persons.find(person => person.id === id)

    if(found){
        persons = persons.filter(person => person.id !== id)
        res.status(204).end()
    }else{
        res.status(404).end()
    }
    
})

app.get('/info', (req, res) => {
    let html = `<p>Phonebook has info for ${persons.length} people</p><br>${Date()}`
    res.send(html)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})