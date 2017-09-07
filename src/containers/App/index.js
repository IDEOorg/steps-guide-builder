import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import Header from '../../components/Header';

const App = (props) => {
  window.scrollTo(0, 0);
  return (
    <div className="app">
      <Header />
      <div className="app_content">
        { props.children }
      </div>
    </div>
  );
};

export default App;

App.propTypes = {
  children: PropTypes.object.isRequired
};

App.displayName = 'App';
