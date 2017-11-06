import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import Header from '../../components/Header';
import config from '../../data/config';
import { connect } from 'react-redux';

const App = (props) => {
  window.scrollTo(0, 0);
  return (
    <div className="app">
      <Header feedbackUrl={config.guideMaterials.feedbackUrl} language={props.language} />
      <div className="app_content">
        { props.children }
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    language: state.language
  };
}
export default connect(
  mapStateToProps,
  {}
)(App);

App.propTypes = {
  children: PropTypes.object.isRequired
};

App.displayName = 'App';
