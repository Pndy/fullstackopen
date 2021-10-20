export const showNotification = (text) => {
  return {
    type: 'SHOW',
    data: {
      text
    }
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE',
  }
}

const reducer = (state = '', action) => {
  switch(action.type) {
    case 'SHOW':
      return action.data.text
    case 'HIDE':
      return ''
    default:
      return state
  }
}

export default reducer