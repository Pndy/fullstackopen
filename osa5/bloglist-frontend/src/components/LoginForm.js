
import React, { useState } from 'react'
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
    <div>
      <form onSubmit={login}>
        <h2>Log into application</h2>
        <div>
          Username:
          <input
            type="text"
            id="usernameInput"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            id="passwordInput"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="submitLogin">Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm