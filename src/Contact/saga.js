import { take, put, fork, select } from 'redux-saga/effects';
import {remove, update} from 'ramda';

import {getRandomContact, storeContact, removeContact, storeContacts,
  updateContact} from './action';

export default function* userSaga() {
  yield fork(handleGetRandomContact);
  yield fork(handleRemoveContact);
  yield fork(handleUpdateContact);
}

export const getContactList = state => state.contact.contactList;

const RANDOM_USER_API_URL = 'https://randomuser.me/api/?nat=us';

function* handleGetRandomContact() {
  while (true) {
    yield take(getRandomContact);
    const data = yield fetch(RANDOM_USER_API_URL)
      .then(res => res.json())
      .then(data => data.results[0])
      .catch(err => err);
    const contact = {
      name: {
        ...data.name
      },
      email: data.email,
      phone: data.phone,
      location: {
        ...data.location,
        zip: data.location.postcode
      },
      picture: data.picture.thumbnail,
      id: new Date().getTime()
    };
    yield put(storeContact(contact));
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
