import React from 'react'
import { useDispatch } from 'react-redux'
import { Spinner, Form, Button, InputGroup } from 'react-bootstrap'

import { likeBlog, addComment } from '../reducers/blogReducer'

const ShowBlog = ({ blog }) => {
  const dispatch = useDispatch()

  const like = async (bloginfo) => {
    const newBlog = {
      ...bloginfo,
      user: bloginfo.user.id,
      likes: bloginfo.likes+1,
    }
    dispatch(likeBlog(newBlog, bloginfo.id))
  }

  const submitComment = async(e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    e.target.comment.value = ''
    dispatch(addComment(comment, blog.id))
  }

  if(!blog){
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <br /><a href={blog.url}>{blog.url}</a>
      <br /><span id="likes">likes: {blog.likes}</span><button onClick={() => like(blog)}>like</button>
      <br />Added by: {blog.user.name}
      <br /><h3>Comments</h3>
      <Form onSubmit={submitComment}>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            name="comment"
          />
          <Button type="submit">add comment</Button>
        </InputGroup>
      </Form>
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
