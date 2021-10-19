import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

let blogData = {
  id: '616d36f1a247d6c8b0544c49',
  title: 'New blogpost',
  author: 'Author',
  url: 'http://localhost/blog/1',
  likes: 12,
  user: {
    id: '616c4886935621a4049c533e',
    username: 'user',
    name: 'User user'
  }
}

describe('<Blog /> component', () => {

  test('should only show title and author by default', () => {
    const likeBlog = jest.fn()
    const deleteBlog = jest.fn()

    let component = render(
      <Blog blog={blogData} likeBlog={likeBlog} deleteBlog={deleteBlog} />
    )

    expect(component.container).toHaveTextContent(blogData.title)
    expect(component.container).toHaveTextContent(blogData.author)

    expect(component.container).not.toHaveTextContent(blogData.url)
    expect(component.container).not.toHaveTextContent(`likes: ${blogData.likes}`)
  })

  test('also shows url and likes when show more is pressed', () => {
    const likeBlog = jest.fn()
    const deleteBlog = jest.fn()

    let component = render(
      <Blog blog={blogData} likeBlog={likeBlog} deleteBlog={deleteBlog} />
    )

    expect(component.container).not.toHaveTextContent(blogData.url)
    expect(component.container).not.toHaveTextContent(`likes: ${blogData.likes}`)

    const showhideBtn = component.getByText('show')
    fireEvent.click(showhideBtn)

    expect(component.container).toHaveTextContent(blogData.url)
    expect(component.container).toHaveTextContent(`likes: ${blogData.likes}`)
  })


})