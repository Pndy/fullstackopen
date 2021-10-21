let currTimeout

export const setNotification = (text, seconds = 3) => {
  return async function showHideNotif(dispatch) {
    dispatch({
      type: 'SHOW',
      data: text
    })
    clearTimeout(currTimeout)
    currTimeout = setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, Number(seconds)*1000)
  }
}

const reducer = (state = '', action) => {
  switch(action.type) {
    case 'SHOW':
      return action.data
    case 'HIDE':
      return ''
    default:
      return state
  }
}

export default reducer