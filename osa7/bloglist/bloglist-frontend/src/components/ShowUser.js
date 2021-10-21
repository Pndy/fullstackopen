import React from 'react'

const ShowUser = ({ user }) => {
  if(!user){
    return null
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