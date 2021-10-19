import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const [notification, setNotification] = useState(null)

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
      blogService.setToken(newUser.token)
      setUser(newUser)
      setUsername("")
      setPassword("")
      setNotification({text: "logged in"})
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }catch(err){
      setNotification({text: "incorrect login details", type: "error"})
      setTimeout(() => {
        setNotification(null)
      }, 3000)
      
    }
  }

  const handleLogout = async() => {
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    setUser(null)
    setNotification({text: `Logged out`})
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleNewPost = async(e) => {
    e.preventDefault()

    try{
      const newPost = await blogService.create({
        title, author, url
      })
      setTitle("")
      setAuthor("")
      setUrl("")
      setBlogs(blogs.concat(newPost))
      setNotification({text: `Added ${newPost.title} by ${newPost.author}`})
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }catch(err){
      setNotification({text: `Error adding blogpost`, type: 'error'})
      setTimeout(() => {
        setNotification(null)
      }, 3000)
      console.log(err)
    }
  }

  const loginForm = () => (
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

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>

      <div>
        <form onSubmit={handleNewPost} >
          <h2>Add new blog</h2>
          <div>
            title:
            <input 
              type="text"
              value={title}
              name="title"
              onChange={({target}) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input 
              type="text"
              value={author}
              name="author"
              onChange={({target}) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input 
              type="text"
              value={url}
              name="url"
              onChange={({target}) => setUrl(target.value)}
            />
          </div>
          <button type="submit">Add new</button>
        </form>
      </div>
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>    
  )
  
  return (
    <div>
      <Notification details={notification} />
      {user === null ?
        loginForm()
      : blogForm()}
    </div>
  )
}

export default App