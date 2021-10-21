import userService from '../services/users'

export const initUsers = () => {
  return async dispatch => {
    const usersresp = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: usersresp
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export default reducer