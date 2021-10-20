import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  notification: notificationReducer,
  filter: filterReducer,
  anecdotes: anecdoteReducer,
})

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store