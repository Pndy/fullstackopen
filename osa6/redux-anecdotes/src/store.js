import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const reducers = combineReducers({
  notification: notificationReducer,
  anecdotes: anecdoteReducer,
})

const store = createStore(reducers, composeWithDevTools())

export default store