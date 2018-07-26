import { createReducer } from 'redux-act';

import {addContacts, storeContact} from './action';

const initialState = {
  contactList: []
};

const ContactReducer = createReducer({
  [addContacts]: (state, contactList) => ({
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
