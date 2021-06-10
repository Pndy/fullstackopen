import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data
    })
}

const create = newContact => {
    const request = axios.post(baseUrl, newContact)
    return request.then(response => response.data)
}

const deleteById = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, updatedContact) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedContact)
    return request.then(response => response.data)
}

const contactService = {
    getAll,
    create,
    deleteById,
    update
}

export default contactService;