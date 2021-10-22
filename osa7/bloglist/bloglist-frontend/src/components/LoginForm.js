import React, { useState } from 'react'
import { Button, Form, Container } from 'react-bootstrap'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async(e) => {
    e.preventDefault()

    props.handleLogin({
      username, password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <Container>
      <Form onSubmit={login}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            id="usernameInput"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            id="passwordInput"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button type="submit" id="submitLogin" variant="primary">Login</Button>
      </Form>
    </Container>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm