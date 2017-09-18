import React from 'react';
import './index.less';
import config from '../../data/config';
let arrowIcon = require('../../assets/arrow-left.svg');

let headerIconData = null;
if(config.guideMaterials.headerIcon) {
  headerIconData = config.entryIds[config.guideMaterials.headerIcon.id];
}
let headerIconUrl = null;
if(headerIconData) {
  // let headerIconName = headerIconData.fileName;
  headerIconUrl = headerIconData.url; // require('../../assets/' + headerIconName);
}
let headerTitle = config.guideMaterials.headerTitle;

const Header = () =>  {
  let headerIconBlock = null;
  if(headerIconUrl) {
    headerIconBlock = <img src={headerIconUrl} />;
  }
  let headerTitleBlock = null;
  if(headerTitle) {
    headerTitleBlock = (
      <h2 className="header_title">{headerTitle}</h2>
    );
  }
  return (
    <div className="header">
      <a href="https://steps.ideo.org/guides">
        <div className="header_back_box">
          <img className="header_arrow" src={arrowIcon} />
          <p>Home</p>
        </div>
      </a>
      <div>
        { headerIconBlock }
        { headerTitleBlock }
      </div>
      <div></div>
    </div>
  );
};

export default Header;

Header.displayName = 'Header';
