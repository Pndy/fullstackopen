import contactService from './services/contacts'

const PersonsList = ({contacts, setContacts, filterName}) => {
  
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
      })
      .catch(error => {
        alert(`error deleting contact`)
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