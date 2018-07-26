import { createAction } from 'redux-act';

export const storeContacts = createAction('store contacts');
export const addContact = createAction('add contact');
export const storeContact = createAction('store contact');
export const getRandomContact = createAction('get random contact');
export const removeContact = createAction('remove contact');
