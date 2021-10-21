import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogAddForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogAdd = async(e) => {
    e.preventDefault()

    await props.handleNewPost({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={blogAdd}>
        <h2>Add new blog</h2>
        <div>
          title:
          <input
            type="text"
            id="titleInput"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            id="authorInput"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            id="urlInput"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="blogformSubmit">Add new</button>
      </form>
    </div>
  )
}

BlogAddForm.propTypes = {
  handleNewPost: PropTypes.func.isRequired
}

export default BlogAddForm
