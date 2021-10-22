import React from 'react'
import { Spinner } from 'react-bootstrap'

const ShowUser = ({ user }) => {
  if(!user){
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <br />
      <h3>Added blogs:</h3>
      <div>
        <ul>
          {user.blogs.map(b => (
            <li key={b.id}>{b.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ShowUser