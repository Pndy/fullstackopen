const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('Connected to Mongodb')
    })
    .catch((error) => {
        console.log('Failed to connect to Mongo: ', error)
    })

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, retunedObject) => {
        delete retunedObject._id
        delete retunedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)