import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import OptionsIntro from '../OptionsIntro';
import TranslateToggle from '../../containers/TranslateToggle';
import classNames from 'classnames';
import { getTranslation } from '../../globals/utils';
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
    console.log(props.sidebar.content);
    console.log(props.language);
    console.log(getTranslation(props.sidebar.content, props.language));
    sidebarContent = (
      <div className={classNames("sidebar", props.sidebar.position ? "sidebar_center" : null)}>
        <div className="sidebar_content" style={textAlignStyle} dangerouslySetInnerHTML={{"__html": marked(getTranslation(props.sidebar.content, props.language))}} />
        <TranslateToggle />
      </div>
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
