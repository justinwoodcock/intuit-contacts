import { createReducer } from 'redux-act';

import {addContacts} from './action';

const initialState = {
  contacts: []
};

const ContactReducer = createReducer({
  [addContacts]: (state, contacts) => ({
    ...state,
    contacts
  })
}, initialState);

export default ContactReducer;
