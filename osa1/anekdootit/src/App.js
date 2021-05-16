import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({})
  
  const voteSelected = () => {
    const copy = {...points}
    typeof copy[selected] === "number" ? copy[selected] += 1 : copy[selected] = 1 
    setPoints(copy)
  }
  
  const genAnecdotes = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }
  
  const getMostVotedAnecdote = () => {
    if (Object.entries(points).length === 0) { 
      return "No votes yet" 
    } else {
      const key = Object.keys(points).reduce(function (a, b) {
        return points[a] > points[b] ? a : b
      })
      return anecdotes[key]
    }
  }
  
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>votes: {typeof points[selected] === "number" ? points[selected] : 0}</p>
      <button onClick={() => voteSelected()} >Vote</button>
      <button onClick={() => genAnecdotes()} >Next anecdote</button>
      <h2>Anecdote with the most rules</h2>
      <p>{getMostVotedAnecdote()}</p>
    </div>
  )
}

export default App
