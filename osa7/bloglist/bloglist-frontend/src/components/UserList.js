import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'

const UserList = () => {
  const users = useSelector(state => state.users)

  if(!users) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Blogs</td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
