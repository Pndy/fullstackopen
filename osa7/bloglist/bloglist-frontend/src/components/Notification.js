import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if(Object.keys(notification).length === 0) {
    return null
  }

  return (
    <div className={notification.type ? notification.type : 'info'}>
      <h4>{notification.text}</h4>
    </div>
  )
}

export default Notification