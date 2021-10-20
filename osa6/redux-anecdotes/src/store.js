import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducers = combineReducers({
  notification: notificationReducer,
  filter: filterReducer,
  anecdotes: anecdoteReducer,
})

const store = createStore(reducers, composeWithDevTools())

export default store