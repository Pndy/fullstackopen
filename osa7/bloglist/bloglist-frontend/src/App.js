import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap'

import BlogAddForm from './components/BlogAddForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import ShowUser from './components/ShowUser'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import ShowBlog from './components/ShowBlog'

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

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogById = blogMatch
    ? blogs.find(a => a.id === blogMatch.params.id)
    : null

  const handleLogin = async (details) => {
    dispatch(login(details))
  }

  const handleLogout = async() => {
    dispatch(logout())
  }

  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/users'>Users</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            {Object.keys(user).length === 0 ?
              <NavDropdown title="Login" id="basic-nav-dropdown">
                <LoginForm
                  handleLogin={handleLogin}
                />
              </NavDropdown>
              :
              <Navbar.Text className="navbar-item">{user.name} logged in <Button variant='danger' onClick={handleLogout}>Logout</Button></Navbar.Text>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Notification />
      <Switch>
        <Route path='/users/:id'>
          <ShowUser user={userById} />
        </Route>
        <Route path='/users'>
          <UserList />
        </Route>
        <Route path='/blogs/:id'>
          <ShowBlog blog={blogById} />
        </Route>
        <Route path='/'>
          <div>
            <h2>Blogs</h2>
            {Object.keys(user).length === 0 ? null :
              <Togglable showText="add new blog" ref={blogformRef}>
                <BlogAddForm formRef={blogformRef}/>
              </Togglable>
            }
            <div id="blogposts">
              {blogs.map(blog =>
                <div key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>
              )}
            </div>
          </div>
        </Route>
      </Switch>
    </Container>
  )
}

export default App