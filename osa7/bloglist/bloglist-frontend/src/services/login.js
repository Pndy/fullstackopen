import axios from 'axios'
const baseUrl = '/api/login'

const login = async creds => {
  const response = await axios.post(baseUrl, creds)
  return response.data
}

const loginService = {
  login
}
export default loginService