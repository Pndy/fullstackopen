require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const Person = require('./models/person')

const app = express()

app.use(cors())
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
app.use(express.static('build'))

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
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

   //TODO: unique name check

    const person = new Person({
        id: id,
        name: body.name,
        number: body.number
    })

    person.save().then(avedPerson => {
        res.status(200).json(person)
    })
    .catch(err => {
        res.status(200).json({error: 'saving to database'})
    })
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    Person.findOne({id: id}, (err, person) => {
        if(person === null){
            res.status(404).end()
        }else{
            res.json(person)
        }
    })
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})