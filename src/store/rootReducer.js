import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import statementPage from './statementPage/statementPage';
import problems from './problems/problems';
import selectedOptions from './selectedOptions/selectedOptions';
import language from './language/language';

const rootReducer = combineReducers({
  statementPage,
  problems,
  routing: routerReducer,
  language,
  selectedOptions
});

export default rootReducer;
