/* @flow */
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from '../quizGame/reducers';
import logger from 'redux-logger';
const initialState = {};
const configureStore = () => {
  const middleware = [thunk];
  const config = {
    key: 'root',
    storage: storage,
    whitelist: ['quiz']
  };
  if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger(logger));
  }
  //TODO: Add things that will be persisted
  const reducer = persistReducer(config, rootReducer);

  const store = createStore(
    reducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
  const persistor = persistStore(store);
  return { persistor, store };
};

export const { persistor, store } = configureStore();
