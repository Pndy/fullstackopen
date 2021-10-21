import React from 'react'

const Anecdote = ({ anecdote }) => {
  const padding = {
    paddingTop: 5,
    paddingBottom: 5,
  }
  return (
    <div style={padding}>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more information, see: <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

export default Anecdote