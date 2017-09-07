import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import Header from '../../components/Header';
import zipcodes from 'zipcodes';

const App = (props) => {
  console.log(zipcodes.lookup(94582))
  console.log(zipcodes.lookup('94582'))
  console.log(zipcodes.lookup('02114'))
  console.log(zipcodes.lookup('202224'))
  console.log(zipcodes.lookup(2114))
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
