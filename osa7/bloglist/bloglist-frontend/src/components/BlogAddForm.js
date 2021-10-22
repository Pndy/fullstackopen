import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Form } from 'react-bootstrap'

import { addBlog } from '../reducers/blogReducer'

const BlogAddForm = ({ formRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const blogAdd = async(e) => {
    e.preventDefault()

    dispatch(addBlog({
      title,
      author,
      url
    }))

    setTitle('')
    setAuthor('')
    setUrl('')

    formRef.current.toggleVisibility()
  }

  return (
    <div>
      <Form onSubmit={blogAdd}>
        <h2>Add new blog</h2>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            id="titleInput"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            id="authorInput"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Url</Form.Label>
          <Form.Control
            type="text"
            id="urlInput"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button type="submit" id="blogformSubmit">Add new</Button>
      </Form>
    </div>
  )
}

BlogAddForm.propTypes = {}

export default BlogAddForm
