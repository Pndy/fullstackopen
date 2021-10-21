import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'


const reducers = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer
})

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store