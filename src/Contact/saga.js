import { take, put, fork, select, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {getRandomContact} from './action';

export default function* userSaga() {
  yield fork(handleGetRandomContact);
}

function* handleGetRandomContact() {
  while (true) {
    const action = yield take(getRandomContact);
    console.log('getRandomContact');
  }
}
