import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, addAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const add = (e) => {
    e.preventDefault()
    dispatch(addAnecdote(e.target.content.value))
    e.target.content.value = ''
  }

  const sortedArr = (anecdoteList) => {
    let a = anecdoteList
    a.sort((a, b) => b.votes - a.votes)
    return a
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedArr(anecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
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

export default App