import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogAddForm from './components/BlogAddForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)

  const blogformRef = useRef()

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

  const handleLogin = async (details) => {
    try{
      const newUser = await loginService.login(details)
      window.localStorage.setItem('user', JSON.stringify(newUser))
      blogService.setToken(newUser.token)
      setUser(newUser)
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

  const handleNewPost = async(details) => {
    try{
      const newPost = await blogService.create(details)
      setBlogs(blogs.concat(newPost))
      setNotification({text: `Added ${newPost.title} by ${newPost.author}`})
      setTimeout(() => {
        setNotification(null)
      }, 3000)
      blogformRef.current.toggleVisibility()
    }catch(err){
      setNotification({text: `Error adding blogpost`, type: 'error'})
      setTimeout(() => {
        setNotification(null)
      }, 3000)
      console.log(err)
    }
  }

  const likeBlog = async (bloginfo) => {
    const newBlog = {
      title: bloginfo.title,
      author: bloginfo.author,
      url: bloginfo.url,
      likes: bloginfo.likes+1,
      user: bloginfo.user.id,
    }

    const response = await blogService.update(newBlog, bloginfo.id)
    const newBlogList = blogs.map((b) => {
      if(b.id.toString() === response.id.toString()){
        b.likes = response.likes
      }
      return b
    })
    setBlogs(newBlogList)
  }

  
  return (
    <div>
      <h1>Blogs</h1>
      {user === null ? null :
      <div>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      </div>
      }
      <Notification details={notification} />
      {user === null ?
          <LoginForm
            handleLogin={handleLogin}
          />
      : 
        <Togglable showText="add new blog" ref={blogformRef}>
          <BlogAddForm 
            handleNewPost={handleNewPost}
          />
        </Togglable>
      }

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
      )}
    </div>
  )
}

export default App