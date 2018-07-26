import { createReducer } from 'redux-act';

import {storeContacts, storeContact, setContactToEdit} from './action';

const initialState = {
  contactList: [],
  contactToEdit: null
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
  }),
  [setContactToEdit]: (state, contactToEdit) => ({
    ...state,
    contactToEdit
  })
}, initialState);

export default ContactReducer;
