import contactService from './services/contacts'

const PersonsList = ({contacts, setContacts, filterName, setNotification}) => {
  
  const contactList =
    filterName === '' ?
      contacts :
      contacts.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  const deleteContact = (id) => {
    let existingContact = contacts.find(contact => contact.id === id)

    if(!window.confirm(`Delete contact ${existingContact.name}?`)){
      return
    }
    contactService
      .deleteById(id)
      .then(response => {
        const updatedContact = contacts.filter(person => person.id !== id)
        setContacts(updatedContact)
        setNotification({
          text: `Deleted contact ${existingContact.name}`,
          type: 'success'
        })
        setTimeout(() => {
          setNotification('')
        }, 3000)
      })
      .catch(error => {
        const updatedContact = contacts.filter(person => person.id !== id)
        setContacts(updatedContact)
        
        setNotification({
          text: `Information of ${existingContact.name} has already been deleted`,
          type: 'error'
        })
        setTimeout(() => {
          setNotification('')
        }, 3000)
      })
  }

  return (
    <div>
      {contactList.map(person => 
        <li key={person.id}>{person.id}: {person.name} {person.number} <button onClick={()=>deleteContact(person.id)}>Delete</button></li>
      )}
    </div>
  )
}

export default PersonsList