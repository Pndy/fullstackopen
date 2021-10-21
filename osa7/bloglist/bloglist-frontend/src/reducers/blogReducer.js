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

export const likeBlog = (blog, id) => {
  return async dispatch => {
    const blogresp = await blogService.update(blog, id)
    dispatch({
      type: 'LIKE_BLOG',
      data: blogresp
    })
    dispatch(setNotification(`Liked ${blogresp.title}`, 'info', 5))
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    const response = await blogService.deleteBlog(id)
    if(response.status === 204) {
      dispatch({
        type: 'DELETE_BLOG',
        data: id
      })
      dispatch(setNotification('Blogpost deleted', 'info', 5))
    }else{
      dispatch(setNotification('Error deleting blogpost', 'error', 5))
    }
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      return state.map((b) => {
        if(b.id.toString() === action.data.id.toString()){
          b.likes = action.data.likes
        }
        return b
      }).sort((a, b) => {
        return b.likes - a.likes
      })
    case 'DELETE_BLOG':
      return state.filter(b => {return b.id.toString() !== action.data.toString() })
    default:
      return state
  }
}

export default reducer