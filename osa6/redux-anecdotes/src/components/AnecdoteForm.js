import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote, asObject } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (e) => {
    e.preventDefault()
    const anecdoteText = e.target.content.value
    e.target.content.value = ''
    const newAnecdote = await anecdoteService.addAnecdote(asObject(anecdoteText))
    dispatch(addAnecdote(newAnecdote))
    dispatch(showNotification(`You added: ${anecdoteText}`))
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