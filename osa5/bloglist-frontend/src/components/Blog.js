import React, {useState} from 'react'

const Blog = ({blog, likeBlog, deleteBlog, user}) => {
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
        {user && blog.user.username === user.username ?
          <>
            <br /><button onClick={() => {
              if(window.confirm(`Remove ${blog.title} by ${blog.author}?`)){
                deleteBlog(blog.id)
              }
            }}>Delete</button>
          </>
        : null}
      </>
      : null
      }
  </div>  
  )
}

export default Blog