import React, { useState, useEffect } from 'react'
import PersonsList from "./PersonsList";
import PersonsForm from "./PersonsForm";
import Filter from "./Filter";

import contactService from './services/contacts';

const App = () => {
  const [ contacts, setContacts ] = useState([])
  
  const [ filterName, setFilterName] = useState('')
  
  useEffect(() => {
    contactService.getAll()
      .then(initialContacts => {
        setContacts(initialContacts)
      })
    },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilterName={setFilterName} />
      <h2>Add new</h2>
      <PersonsForm contacts={contacts} setContacts={setContacts} />
      <h2>Numbers</h2>
      <PersonsList filterName={filterName} contacts={contacts} setContacts={setContacts}/>
    </div>
  )
}

export default App