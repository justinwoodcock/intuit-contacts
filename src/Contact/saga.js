import { take, put, fork, select, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {remove} from 'ramda';

import {getRandomContact, storeContact, removeContact, storeContacts} from './action';

export default function* userSaga() {
  yield fork(handleGetRandomContact);
  yield fork(handleRemoveContact);
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
