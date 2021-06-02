import React, { useState } from 'react'
import PersonsList from "./PersonsList";
import PersonsForm from "./PersonsForm";
import Filter from "./Filter";

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  
  const [ filterName, setFilterName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilterName={setFilterName} />
      <h2>Add new</h2>
      <PersonsForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <PersonsList filterName={filterName} persons={persons}/>
    </div>
  )
}

export default App