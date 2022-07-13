import { combineReducers } from 'redux'
import receiptsReducer from './receipts'
import loggedInUserReducer from './loggedInUser'
export default combineReducers({
  receipts: receiptsReducer,
  loggedInUser: loggedInUserReducer,
})
