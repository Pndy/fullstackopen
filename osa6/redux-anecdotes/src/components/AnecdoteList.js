import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id, text) => {
    dispatch(voteAnecdote(id))
    dispatch(showNotification(`You voted: ${text}`))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }

  const sortedArr = (anecdoteList) => {
    let a = anecdoteList
    a.sort((a, b) => b.votes - a.votes)
    return a
  }

  return (
    <div>
      {sortedArr(anecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteForm