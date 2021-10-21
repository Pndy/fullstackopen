import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

import Blog from './components/Blog'
import BlogAddForm from './components/BlogAddForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import ShowUser from './components/ShowUser'
import Togglable from './components/Togglable'
import UserList from './components/UserList'

import { initBlogs } from './reducers/blogReducer'
import { initUser, login, logout } from './reducers/loginReducer'
import { initUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

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

  useEffect(() => {
    dispatch(initUsers())
  }, [])

  const userMatch = useRouteMatch('/users/:id')
  const userById = userMatch
    ? users.find(a => a.id === userMatch.params.id)
    : null

  const handleLogin = async (details) => {
    dispatch(login(details))
  }

  const handleLogout = async() => {
    dispatch(logout())
  }

  return (
    <div>
      <h1>Blogs</h1>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/users'>Users</Link>
      </div>
      {Object.keys(user).length === 0 ? null :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        </div>
      }
      <Notification />
      <Switch>
        <Route path='/users/:id'>
          <ShowUser user={userById} />
        </Route>
        <Route path='/users'>
          <UserList />
        </Route>
        <Route path='/'>
          <div>
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
        </Route>
      </Switch>
    </div>
  )
}

export default App