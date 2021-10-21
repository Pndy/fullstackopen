import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'

const Blog = ({ blog, user }) => {
  const [visible, setVisibility] = useState(false)
  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setVisibility(!visible)
  }


  const like = async (bloginfo) => {
    const newBlog = {
      title: bloginfo.title,
      author: bloginfo.author,
      url: bloginfo.url,
      likes: bloginfo.likes+1,
      user: bloginfo.user.id,
    }
    dispatch(likeBlog(newBlog, bloginfo.id))
  }

  const deleteB = async (id) => {
    dispatch(deleteBlog(id))
  }

  return (
    <div className="blogentry">
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      {visible ?
        <>
          <br />{blog.url}
          <br /><span id="likes">likes: {blog.likes}</span> <button onClick={() => like(blog)}>like</button>
          <br />{blog.user.name}
          {user && blog.user.username === user.username ?
            <>
              <br /><button onClick={() => {
                if(window.confirm(`Remove ${blog.title} by ${blog.author}?`)){
                  deleteB(blog.id)
                }
              }}>Delete</button>
            </>
            : null
          }
        </>
        : null
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object
}

export default Blog