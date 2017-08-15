import React from 'react';
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

export default ProblemsPage;

ProblemsPage.displayName = 'Problems Page';
