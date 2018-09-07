import {combineReducers} from 'redux';
import {reducer as formReducer } from 'redux-form'

import customerReducer from './customer';
import headlinesReducer from './headlines';
import sentimentReducer from './nlp';

export default combineReducers({
  customers: customerReducer,
  headlines: headlinesReducer,
  sentiment: sentimentReducer,
  form: formReducer
})

