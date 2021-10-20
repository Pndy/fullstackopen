import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const addAnecdote = async (data) => {
  const res = await axios.post(baseUrl, data)
  return res.data
}

const updateAnecdote = async (data) => {
  const res = await axios.put(`${baseUrl}/${data.id}`, data)
  return res.data
}

export default {
  getAll,
  addAnecdote,
  updateAnecdote,
}