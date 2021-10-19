import React, { useState, useImperativeHandle } from 'react'

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
        <button onClick={toggleVisibility}>{props.hideText ? props.hideText : 'cancel'}</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.showText ? props.showText : 'show'}</button>
      </div>
      
    </div>
  )
})

export default Togglable
