import { createStore,combineReducers } from 'redux'
import todoApp from './Reducer/Reducer'

const store = createStore(combineReducers({
    todoApp
}))

export default store



   