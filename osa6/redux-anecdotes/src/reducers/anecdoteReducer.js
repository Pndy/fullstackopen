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

export const voteAnecdote = (content) => {
  return async dispatch => {
    const res = await anecdoteService.updateAnecdote({ ...content, votes: content.votes+1 })
    dispatch({
      type: 'VOTE',
      data: res
    })
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
      const updAnecdote = { ...action.data }
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