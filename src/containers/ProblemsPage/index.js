import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.less';
import ProblemsSection from '../ProblemsSection';
import Sidebar from '../../components/Sidebar';
import config from '../../data/config';

const ProblemsPage = (props) => {
  let sidebar = config.problemsPage.sidebar;
  return (
    <div className="main_page">
      <Sidebar sidebar={sidebar} language={props.language} />
      <ProblemsSection />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    language: state.language,
  };
}

export default connect(
  mapStateToProps,
  {}
)(ProblemsPage);

ProblemsPage.propTypes = {
  language: PropTypes.string.isRequired,
};

ProblemsPage.displayName = 'Problems Page';
