import { take, put, fork, select, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {remove, update} from 'ramda';

import {getRandomContact, storeContact, removeContact, storeContacts,
  updateContact} from './action';

export default function* userSaga() {
  yield fork(handleGetRandomContact);
  yield fork(handleRemoveContact);
  yield fork(handleUpdateContact);
}

export const getContactList = state => state.contact.contactList;

function* handleGetRandomContact() {
  while (true) {
    const action = yield take(getRandomContact);
    console.log('getRandomContact');
  }
}

function* handleRemoveContact() {
  while (true) {
    const action = yield take(removeContact);
    const contactList = yield select(getContactList);
    const numberOfItemsToRemove = 1;
    const updatedContactList = remove(action.payload, numberOfItemsToRemove, contactList);
    yield put(storeContacts(updatedContactList));
  }
}

function* handleUpdateContact() {
  while (true) {
    const action = yield take(updateContact);
    const {index, contact} = action.payload;
    const contactList = yield select(getContactList);
    const updatedContactList = update(index, contact, contactList);
    yield put(storeContacts(updatedContactList));
  }
}
