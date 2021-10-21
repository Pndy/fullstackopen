import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import BlogAddForm from './components/BlogAddForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { initBlogs } from './reducers/blogReducer'
import { initUser, login, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogformRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    const userJson = window.localStorage.getItem('user')
    if(userJson){
      dispatch(initUser(JSON.parse(userJson)))
    }
  }, [])

  const handleLogin = async (details) => {
    dispatch(login(details))
  }

  const handleLogout = async() => {
    dispatch(logout())
  }

  return (
    <div>
      <h1>Blogs</h1>
      {Object.keys(user).length === 0 ? null :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        </div>
      }
      <Notification />
      {Object.keys(user).length === 0 ?
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
          <Blog key={blog.id} blog={blog} user={user} />
        )}
      </div>
    </div>
  )
}

export default App