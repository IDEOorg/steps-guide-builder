import React from 'react';
import './index.less';
import config from '../../data/config';
import {getTranslation} from '../../globals/utils';

let arrowIcon = require('../../assets/arrow-left.svg');
let feedbackIcon = require('../../assets/feedback-blue.svg');

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

const Header = (props) =>  {
  let headerIconBlock = null;
  if(headerIconUrl) {
    headerIconBlock = <img src={headerIconUrl} />;
  }
  let headerTitleBlock = null;
  if(headerTitle) {
    headerTitleBlock = (
      <h2 className="header_title">
        {getTranslation(headerTitle, props.language)}
      </h2>
    );
  }
  let headerFeedbackBlock = null;
  if(props.feedbackUrl) {
    headerFeedbackBlock = (
      <a className="header_feedback_link" href={getTranslation(props.feedbackUrl, props.language)} target="_blank">
        <div className="header_back_box">
          <img className="feedback_icon" src={feedbackIcon} />
          <p className="feedback_text">{getTranslation(config.guideMaterials.feedbackText, props.language)}</p>
        </div>
      </a>
    );
  }
  return (
    <div className="header">
      <a className="header_back_link" href="https://steps.ideo.org/guides">
        <div className="header_back_box">
          <img className="header_arrow" src={arrowIcon} />
          <p>{getTranslation(config.guideMaterials.homeText, props.language)}</p>
        </div>
      </a>
      <div>
        { headerIconBlock }
        { headerTitleBlock }
      </div>
      { headerFeedbackBlock}
    </div>
  );
};

export default Header;

Header.displayName = 'Header';
