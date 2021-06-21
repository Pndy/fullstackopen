 import {useState} from "react";

 import contactService from './services/contacts'


const PersonsForm = ({contacts, setContacts, setNotification}) => {
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
    if (contacts.some(person => person.name === newName)) {
      // Find contact from list
      let existingContact = contacts.find(contact => contact.name === newName)

      if(window.confirm(`${newName} already added. want to update number?`)){
        // Update in database
        existingContact.number = newNumber
        contactService.update(existingContact.id, existingContact).then(() => {
          // Udpate in app
          let updateContacts = contacts.map(contact => {
            if(contact.name === newName){
              contact.number = newNumber;
            }
            return contact
          })
          setContacts(updateContacts)
          setNotification({
            text: `Updated ${existingContact.name} number to ${newNumber}`,
            type: 'success'
          })
          setTimeout(() => {
            setNotification('')
          }, 3000)
        })
      }

    }else{
      contactService.create({
        name: newName,
        number: newNumber
      }).then(person => {
        let newContacts = contacts.concat({name: person.name, number: person.number, id: person.id}) 
        setContacts(newContacts)
        setNotification({
          text: `Added ${newName}`,
          type: 'success'
        })
        setTimeout(() => {
          setNotification('')
        }, 3000)
      }).catch(error => {
        alert(`Error uploading to server: ${error}`)
      })
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <form>
      <div>
        name: <input value={newName} onChange={changeNewName} /><br />
        number: <input value={newNumber} onChange={changeNewNumber} /> 
      </div>
      <div>
        <button onClick={(e) => handleNewContact(e)}>add</button>
      </div>
    </form>
  )
}

export default PersonsForm