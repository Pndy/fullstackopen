import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (e) => {
    e.preventDefault()
    const anecdoteText = e.target.content.value
    e.target.content.value = ''
    dispatch(addAnecdote(anecdoteText))
    dispatch(setNotification(`You added: ${anecdoteText}`, 5))
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