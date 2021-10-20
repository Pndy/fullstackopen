import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import {showNotification, hideNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const add = (e) => {
    e.preventDefault()
    const newAnecdote = e.target.content.value
    e.target.content.value = ''
    dispatch(addAnecdote(newAnecdote))
    dispatch(showNotification(`You added: ${newAnecdote}`))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
    
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input type="text" name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm