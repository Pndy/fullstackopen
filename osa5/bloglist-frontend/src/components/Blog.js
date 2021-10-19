import React, {useState} from 'react'

const Blog = ({blog, likeBlog}) => {
  const [visible, setVisibility] = useState(false)

  const toggleVisibility = () => {
    setVisibility(!visible)
  }

  return (
    <div className="blogentry">
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      {visible ?
      <>
        <br />{blog.url}
        <br />likes: {blog.likes} <button onClick={() =>likeBlog(blog)}>like</button>
        <br />{blog.user.name}
      </>
      : null
      }
  </div>  
  )
}

export default Blog