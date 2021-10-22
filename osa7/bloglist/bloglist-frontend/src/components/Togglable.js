import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisibility] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibility(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="warning" onClick={toggleVisibility}>{props.hideText ? props.hideText : 'cancel'}</Button>
      </div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.showText ? props.showText : 'show'}</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  showText: PropTypes.string.isRequired,
  hideText: PropTypes.string
}

export default Togglable
