/* eslint-disable no-case-declarations */
import anecdoteService from '../services/anecdoteService'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addAnecdote(asObject(content))
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const initAnecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'ADD_INIT',
      data: initAnecdotes
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdote = state.find(a => a.id === id)
      const updAnecdote = {
        ...anecdote,
        votes: anecdote.votes+1
      }
      return state.map(a => a.id === id ? updAnecdote : a)
    case 'ADD':
      return [...state, action.data]
    case 'ADD_INIT':
      return action.data
    default:
      return state
  }
}

export default reducer