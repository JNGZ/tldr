import {combineReducers} from 'redux';
import {reducer as formReducer } from 'redux-form'

import headlinesReducer from './headlines';
import chartReducer from './chartReducer';
import errorReducer from './errorReducer';

// Combine all the reducers into a root reducer
export default combineReducers({
  headlines: headlinesReducer,
  chart: chartReducer,
  form: formReducer,
  error: errorReducer
})

