import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
//import { prettyDOM } from '@testing-library/dom'
import BlogAddForm from './BlogAddForm'

describe('<BlogAddForm /> component', () => {

  test('posting form has correct inputs', async() => {

    const handleNewPost = jest.fn()
    let component = render(
      <BlogAddForm handleNewPost={handleNewPost} />
    )

    const titleInput = component.container.querySelector('input[name="title"]')
    const authorInput = component.container.querySelector('input[name="author"]')
    const urlInput = component.container.querySelector('input[name="url"]')
    const submitBtn = component.container.querySelector('button')


    userEvent.type(titleInput, 'New Blogpost')
    userEvent.type(authorInput, 'Matti Meikäläinen')
    userEvent.type(urlInput, 'http://localhost/blog/1')

    // Needs act due to multiple setStates happening
    // when its called to clear user input
    await act(async () => {
      fireEvent.click(submitBtn)
    })

    expect(handleNewPost.mock.calls).toHaveLength(1)
    expect(handleNewPost.mock.calls[0][0].title).toBe('New Blogpost')
    expect(handleNewPost.mock.calls[0][0].author).toBe('Matti Meikäläinen')
    expect(handleNewPost.mock.calls[0][0].url).toBe('http://localhost/blog/1')
  })

})