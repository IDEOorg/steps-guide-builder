import React from 'react';
import { connect } from 'react-redux';
import './index.less';
import ProblemsSection from '../ProblemsSection';
import Sidebar from '../../components/Sidebar';
import config from '../../data/config';

const ProblemsPage = () => {
  let sidebar = config.problemsPage.sidebar;
  return (
    <div className="main_page">
      <Sidebar sidebar={sidebar} />
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

ProblemsPage.displayName = 'Problems Page';
