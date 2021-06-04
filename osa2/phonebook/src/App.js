import React, { useState, useEffect } from 'react'
import PersonsList from "./PersonsList";
import PersonsForm from "./PersonsForm";
import Filter from "./Filter";

import axios from "axios";

const App = () => {
  const [ persons, setPersons ] = useState([])
  
  const [ filterName, setFilterName] = useState('')
  
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
    },[])

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