const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('Connected to Mongodb')
    })
    .catch((error) => {
        console.log('Failed to connect to Mongo: ', error)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        unique: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true
    }
})
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, retunedObject) => {
        retunedObject.id = retunedObject._id.toString()
        delete retunedObject._id
        delete retunedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)