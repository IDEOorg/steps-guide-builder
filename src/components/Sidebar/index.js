import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import OptionsIntro from '../OptionsIntro';
import classNames from 'classnames';
import './index.less';

const Sidebar = (props) => {
  let navigation = null;
  let sidebarContent = null;
  // let sidebarPosition = null;
  if(props.sidebar) {
    let textAlignStyle = null;
    if(props.sidebar.textAlign === false) {
      textAlignStyle = {textAlign: 'left'};
    }
    sidebarContent = (
      <div className={classNames("sidebar_content", props.sidebar.position ? "sidebar_content_center" : null)} style={textAlignStyle} dangerouslySetInnerHTML={{"__html": marked(props.sidebar.content)}} />
    );
    // sidebarPosition = props.sidebar.position;
  }
  if(props.navigation) {
    navigation = (
      <div className="navigation">
        <OptionsIntro
        headlineText={props.navigation.title}
        goBack={props.goBack}
        goBackText={props.navigation.linkText}
        />
      </div>
    );
  }
  return (
    <div className="sidebar_section">
      { navigation }
      { sidebarContent }
    </div>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  goBack: PropTypes.func,
  sidebar: PropTypes.object.isRequired,
  navigation: PropTypes.object
};

Sidebar.displayName = 'Sidebar';
