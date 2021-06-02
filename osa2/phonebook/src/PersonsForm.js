 import {useState} from "react";


const PersonsForm = ({persons, setPersons}) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')


  const changeNewName = (event) => {
    setNewName(event.target.value)
  }
  const changeNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewContact = (e) => {
    // pevent from submit
    e.preventDefault()

    // make sure name isnt in list already
    persons.some(person => person.name === newName ) ?
      alert(`${newName} is already added to phonebook`) :
      setPersons(persons.concat({name: newName, number: newNumber}))
  }

  return (
    <form>
      <div>
        name: <input onChange={changeNewName} /><br />
        number: <input onChange={changeNewNumber} />
      </div>
      <div>
        <button onClick={(e) => handleNewContact(e)}>add</button>
      </div>
    </form>
  )
}

export default PersonsForm