import { combineReducers } from 'redux'
import receiptsReducer from './receipts'

export default combineReducers({
  receipts: receiptsReducer,
})
