import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => {
    return filter === '' ? state.anecdotes :
      state.anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(showNotification(`You voted: ${anecdote.content}`))
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteForm