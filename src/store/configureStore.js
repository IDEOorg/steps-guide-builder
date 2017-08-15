import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(routerMiddleware(hashHistory))
  );
}
