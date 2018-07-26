import { combineReducers } from 'redux';

import ContactReducer from './Contact/reducer';

const rootReducer = combineReducers({
  contact: ContactReducer
});

export default rootReducer;
