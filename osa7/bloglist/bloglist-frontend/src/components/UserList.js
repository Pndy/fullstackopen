import React, { useState, useEffect }from 'react'
import userService from '../services/users'

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async() => {
      const usersresp = await userService.getAll()
      setUsers(usersresp)
    }
    getUsers()
  }, [])

  if(users.length === 0) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <td>Name</td>
          <td>Blogs</td>
        </tr>
        {users.map(user => (
          <tr key={user.id}><td>{user.name}</td><td>{user.blogs.length}</td></tr>
        ))}
      </table>
    </div>
  )
}

export default UserList
