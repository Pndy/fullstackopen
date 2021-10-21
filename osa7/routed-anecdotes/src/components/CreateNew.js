import React from 'react'
import { useField } from '../hooks'


const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const getFields = (field) => {
    // eslint-disable-next-line no-unused-vars
    const { reset, ...inputFields } = field
    return inputFields
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...getFields(content)} />
        </div>
        <div>
          author
          <input {...getFields(author)} />
        </div>
        <div>
          url for more info
          <input {...getFields(info)} />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
