require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const Person = require('./models/person')
const { response } = require('express')

const app = express()

app.use(cors())
app.use(express.static('build'))
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


app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = Number(req.params.id)
    Person.findById(req.params.id).then(person => {
        if(person){
            res.json(person)
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
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
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.status(200).json(savedPerson)
    })
    .catch(err => {
        console.log(err)
        res.status(200).json({error: `saving to database`})
    })
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, {new:true})
        .then(updatedPerson => {
            console.log(updatedPerson)
            res.json(updatedPerson)
        }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            if(result){
                res.status(204).end()
            }else{
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    Person.countDocuments((err, count) => {
        if(err){
            console.log(err)
            res.status(400).json({error: 'database error'})
        }else{
            res.send(`<p>Phonebook has info for ${count} people</p><br>${Date()}`)
        }
    })
})

const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    if(error.name === 'CastError'){
        return res.status(400).send({error: 'malformatted id'})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})