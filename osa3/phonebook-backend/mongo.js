require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

if(process.argv.length < 3){
    console.log('provide mongodb password as an arguement')
    process.exit(1)
}

// Not needed as password is already in .env
const password = process.argv[2]

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});



if(process.argv.length === 3){
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}else{
    const name = process.argv[3]
    const number = process.argv[4]


    const person = new Person({
        id: Math.floor(Math.random()*(1000-1)+1),
        name: name,
        number: number
    })

    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}



