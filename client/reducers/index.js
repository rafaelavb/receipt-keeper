import { combineReducers } from 'redux'
import categoriesReducer from './categories'
import receiptsReducer from './receipts'
import loggedInUserReducer from './loggedInUser'

export default combineReducers({
  categories: categoriesReducer,
  receipts: receiptsReducer,
  loggedInUser: loggedInUserReducer,
})
