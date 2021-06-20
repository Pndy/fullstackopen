import React, { useState, useEffect } from 'react'
import PersonsList from "./PersonsList";
import PersonsForm from "./PersonsForm";
import Filter from "./Filter";
import Notification from './Notification'

import contactService from './services/contacts';

import './style.css'

const App = () => {
  const [ contacts, setContacts ] = useState([])
  
  const [ filterName, setFilterName] = useState('')
  const [ notification, setNotification ] = useState('')
  
  useEffect(() => {
    contactService.getAll()
      .then(initialContacts => {
        setContacts(initialContacts)
      })
    },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter setFilterName={setFilterName} />
      <h2>Add new</h2>
      <PersonsForm contacts={contacts} setContacts={setContacts}  setNotification={setNotification}/>
      <h2>Numbers</h2>
      <PersonsList filterName={filterName} contacts={contacts} setContacts={setContacts} setNotification={setNotification}/>
    </div>
  )
}

export default App