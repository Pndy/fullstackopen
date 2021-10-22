import React from 'react'
import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if(Object.keys(notification).length === 0) {
    return null
  }

  return (
    <Alert variant={notification.type}>
      <h4>{notification.text}</h4>
    </Alert>
  )
}

export default Notification