import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import './index.less';
import StatementsSection from '../StatementsSection';
import Sidebar from '../../components/Sidebar';

const StatementsPage = (props) => {
  let sidebar = (
    <Sidebar navigation={props.navigation} goBack={props.goBack} sidebar={props.sidebar} language={props.language} />
  );
  return (
    <div className="main_page">
      { sidebar }
      <StatementsSection />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    language: state.language,
    navigation: state.statementPage.navigation,
    sidebar: state.statementPage.sidebar,
    url: state.statementPage.url ? state.statementPage.url.urlText : '/',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goBack: () => {
      return dispatch(push('/'));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatementsPage);

StatementsPage.propTypes = {
  sidebar: PropTypes.object,
  goBack: PropTypes.func.isRequired,
  navigation: PropTypes.object
};

StatementsPage.displayName = 'StatementsPage';
