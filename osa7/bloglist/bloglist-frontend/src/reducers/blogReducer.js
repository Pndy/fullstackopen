import blogService from '../services/blogs'

import { setNotification } from './notificationReducer'

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => {
      return b.likes - a.likes
    })
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    try {
      const blogresp = await blogService.create(blog)
      dispatch({
        type: 'ADD_BLOG',
        data: blogresp
      })
      dispatch(setNotification(`Added ${blogresp.title} by ${blogresp.author}`, 'info', 5))
    }catch(err){
      dispatch(setNotification('Error adding blogpost', 'error', 5))
    }
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_BLOG':
      return [...state, action.data]
    default:
      return state
  }
}

export default reducer