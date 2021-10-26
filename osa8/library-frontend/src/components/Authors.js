import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR_BORN } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')  
  const [born, setBorn] = useState('')
  const authors = useQuery(ALL_AUTHORS)
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
    }
  })

  if (!props.show) {
    return null
  }

  
  if(authors.loading){
    return <div>Loading...</div>
  }

  const submit = (e) => {
    e.preventDefault()

    if(name === '' || isNaN(born)){
      return
    }

    updateAuthor({
      variables: {
        name,
        setBornTo: Number(born)
      }
    })

    setName('')
    setBorn('')
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <div>
        <form onSubmit={submit}>
          <div>
            name
            <select value={name} onChange={({target}) => setName(target.value)}>
              {authors.data.allAuthors.map(a => 
                <option value={a.name}>{a.name}</option>  
              )}
            </select>
          </div>
          <div>
            born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button>Update</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
