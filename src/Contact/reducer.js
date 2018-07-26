import { createReducer } from 'redux-act';

import {storeContacts, storeContact} from './action';

const initialState = {
  contactList: []
};

const ContactReducer = createReducer({
  [storeContacts]: (state, contactList) => ({
    ...state,
    contactList
  }),
  [storeContact]: (state, contact) => ({
    ...state,
    contactList: [
      ...state.contactList,
      contact
    ]
  })
}, initialState);

export default ContactReducer;
