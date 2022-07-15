import { combineReducers } from 'redux'
import receiptsReducer from './receipts'
import loggedInUserReducer from './loggedInUser'
import storesReducer from './stores'

export default combineReducers({
  receipts: receiptsReducer,
  loggedInUser: loggedInUserReducer,
  stores: storesReducer,
})
