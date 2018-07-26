import { fork } from 'redux-saga/effects';

import contactSaga from './Contact/saga';

export default function* rootSaga() {
  yield fork(contactSaga);
}
