const PersonsList = ({persons, filterName}) => {
  const personsList =
    filterName === '' ?
      persons :
      persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      {personsList.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </div>
  )
}

export default PersonsList