/* eslint-disable no-case-declarations */

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
  return {
    type: 'ADD',
    data: {
      content
    }
  }
}

export const addInitialAnecdotes = (content) => {
  return {
    type: 'ADD_INIT',
    data: {
      content
    }
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
      return [...state, asObject(action.data.content)]
    case 'ADD_INIT':
      return action.data.content
    default:
      return state
  }
}

export default reducer