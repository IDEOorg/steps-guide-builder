import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import statementPage from './statementPage/statementPage';
import problems from './problems/problems';
import selectedOptions from './selectedOptions/selectedOptions';

const rootReducer = combineReducers({
  statementPage,
  problems,
  routing: routerReducer,
  selectedOptions
});

export default rootReducer;
