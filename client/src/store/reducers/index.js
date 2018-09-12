import {combineReducers} from 'redux';
import {reducer as formReducer } from 'redux-form'

import headlinesReducer from './headlines';
import chartReducer from './chartReducer';

export default combineReducers({
  headlines: headlinesReducer,
  chart: chartReducer,
  form: formReducer
})

