import {combineReducers} from 'redux';
import {reducer as formReducer } from 'redux-form'

import headlinesReducer from './headlines';

export default combineReducers({
  headlines: headlinesReducer,
  form: formReducer
})

