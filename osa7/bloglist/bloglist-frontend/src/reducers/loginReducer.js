import loginService from '../services/login'
import blogService from '../services/blogs'

import { setNotification } from './notificationReducer'

export const login = (details) => {
  return async dispatch => {
    try{
      const newUser = await loginService.login(details)
      window.localStorage.setItem('user', JSON.stringify(newUser))
      blogService.setToken(newUser.token)
      dispatch({
        type: 'LOGIN_USER',
        data: newUser
      })
      dispatch(setNotification(`Welcome ${newUser.name}`, 'info', 5))
    }catch(err){
      dispatch(setNotification('Incorrect login details', 'warning', 5))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    dispatch({
      type: 'LOGOUT_USER',
    })
    dispatch(setNotification('Logged out!', 'info', 5))
  }
}

export const initUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'INIT_USER',
      data: user
    })
    blogService.setToken(user.token)
  }
}


const reducer = (state = {}, action) => {
  switch(action.type){
    case 'LOGIN_USER':
      return action.data
    case 'LOGOUT_USER':
      return {}
    case 'INIT_USER':
      return action.data
    default:
      return state
  }
}

export default reducer