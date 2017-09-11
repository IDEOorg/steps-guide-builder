import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import statementPage from './statementPage/statementPage';
import selectedOptions from './selectedOptions/selectedOptions';

const rootReducer = combineReducers({
  statementPage,
  routing: routerReducer,
  selectedOptions
});

export default rootReducer;
