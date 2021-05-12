import {combineReducers} from 'redux';
import reducer from './reducer'
import index from './index'


 export default combineReducers({
     app:index,
     my:reducer,
 })