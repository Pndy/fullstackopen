import React from 'react'
import { useDispatch } from 'react-redux'

import { likeBlog } from '../reducers/blogReducer'

const ShowBlog = ({ blog }) => {
  const dispatch = useDispatch()

  const like = async (bloginfo) => {
    const newBlog = {
      title: bloginfo.title,
      author: bloginfo.author,
      url: bloginfo.url,
      likes: bloginfo.likes+1,
      user: bloginfo.user.id,
      comments: bloginfo.comments
    }
    dispatch(likeBlog(newBlog, bloginfo.id))
  }

  if(!blog){
    return null
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <br /><a href={blog.url}>{blog.url}</a>
      <br /><span id="likes">likes: {blog.likes}</span><button onClick={() => like(blog)}>like</button>
      <br />Added by: {blog.user.name}
      <br /><h3>Comments</h3>
      {!blog.comments || blog.comments.length === 0 ?
        <p>No Comments</p> :
        <ul>
          {blog.comments.map(comment => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      }
    </div>
  )
}

export default ShowBlog
