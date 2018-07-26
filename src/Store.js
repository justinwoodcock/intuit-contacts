import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './Reducer';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import rootSaga from './Saga';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import history from './History';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

const logger = createLogger({
  collapsed: true
});

const config = {
  key: 'intuit',
  storage,
  blacklist: []
}

let persistor = null;

export const getPersistor = () => persistor;

export default function configureStore(initialState, context = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    persistReducer(
      config,
      connectRouter(history)(rootReducer)
    ),
    initialState,
    compose(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history),
        logger
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  persistor = persistStore(store);

  sagaMiddleware.run(rootSaga, context);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./Reducer', () => {
      const nextRootReducer = require('./Reducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
