import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userJson = window.localStorage.getItem('user')
    if(userJson){
      const newUser = JSON.parse(userJson)
      setUser(newUser)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try{
      const newUser = await loginService.login({
        username, password
      })
      window.localStorage.setItem('user', JSON.stringify(newUser))
      setUser(newUser)
      setUsername("")
      setPassword("")
    }catch(err){
      console.log(err)
    }
  }

  const handleLogout = async() => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <form onSubmit={handleLogin}>
          <h2>Log into application</h2>
          <div>
            Username: 
            <input 
              type="text"
              value={username}
              name="username"
              onChange={({target}) => setUsername(target.value)} 
            />
          </div>
          <div>
            Password: 
            <input 
              type="password"
              value={password}
              name="password"
              onChange={({target}) => setPassword(target.value)} 
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App