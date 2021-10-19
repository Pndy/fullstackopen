import React from 'react'

const Notification = (props) => {
  if(!props.details) {
    return null
  }

  return (
    <div className={props.details.type ? props.details.type : 'info'}>
      <h4>{props.details.text}</h4>
    </div>
  )
}

export default Notification