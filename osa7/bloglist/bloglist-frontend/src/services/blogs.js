import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async details => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, details, config)
  return response.data
}

const update = async (details, id) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.put(`${baseUrl}/${id}`, details, config)
  return response.data

}

const deleteBlog = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

const addCommentToBlog = async (comment, id) => {
  const resp = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return resp.data
}

const blogService = {
  setToken,
  getAll,
  create,
  update,
  deleteBlog,
  addCommentToBlog
}
export default blogService