import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';
import App from '../containers/App';
import ProblemsPage from '../containers/ProblemsPage';
import StatementsPage from '../containers/StatementsPage';
import OptionsPage from '../containers/OptionsPage';
import config from '../data/config';
import "babel-polyfill";
import { withTracker } from '../globals/tracker';
// for documentation for withTracker, see: https://github.com/react-ga/react-ga/wiki/React-Router-v4-withTracker

const Routes = (props) => {
  return (
    <Router history={props.history}>
      <Route component={withTracker(App)}>
        <Route path="/" component={config.problemsPage ? ProblemsPage : StatementsPage} />
        <Route path="/statements/:statement" component={StatementsPage} />
        <Route path="/statements/:statement/options" component={OptionsPage} />
        <Route path="/options" component={OptionsPage} />
      </Route>
    </Router>
  );
};

export default Routes;

Routes.propTypes = {
  history: PropTypes.object.isRequired
};

/*
TODO
-----
- implement views in GA
*/
