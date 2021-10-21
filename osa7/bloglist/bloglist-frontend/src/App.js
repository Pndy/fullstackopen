import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import BlogAddForm from './components/BlogAddForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const blogformRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    const userJson = window.localStorage.getItem('user')
    if(userJson){
      const newUser = JSON.parse(userJson)
      setUser(newUser)
      blogService.setToken(newUser.token)
    }
  }, [])

  const handleLogin = async (details) => {
    try{
      const newUser = await loginService.login(details)
      window.localStorage.setItem('user', JSON.stringify(newUser))
      blogService.setToken(newUser.token)
      setUser(newUser)
      dispatch(setNotification(`Welcome ${newUser.name}`, 'info', 5))
    }catch(err){
      dispatch(setNotification('Incorrect login details', 'error', 5))
    }
  }

  const handleLogout = async() => {
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    setUser(null)
    dispatch(setNotification('Logged out!', 'info', 5))
  }

  /*
  const handleNewPost = async(details) => {
    try{
      const newPost = await blogService.create(details)
      //setBlogs(blogs.concat(newPost))
      dispatch(setNotification(`Added ${newPost.title} by ${newPost.author}`, 'info', 5))
      blogformRef.current.toggleVisibility()
    }catch(err){
      dispatch(setNotification('Error adding blogpost', 'error', 5))
      console.log(err)
    }
  }
  */

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
    newBlogList.sort((a, b) => {
      return b.likes - a.likes
    })
    //setBlogs(newBlogList)
  }

  const deleteBlog = async (id) => {
    const response = await blogService.deleteBlog(id)
    if(response.status === 204) {
      //const newBlogList = blogs.filter(b => {return b.id.toString() !== id.toString() })
      //setBlogs(newBlogList)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      {user === null ? null :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        </div>
      }
      <Notification />
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
        />
        :
        <Togglable showText="add new blog" ref={blogformRef}>
          <BlogAddForm formRef={blogformRef}/>
        </Togglable>
      }
      <div id="blogposts">
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />
        )}
      </div>
    </div>
  )
}

export default App