import React from 'react';
import PropTypes from 'prop-types';
import ContentBox from '../ContentBox';
import UrlBox from '../UrlBox';
import ZipcodeBox from '../ZipcodeBox';
import PhoneBox from '../PhoneBox';
import CriteriaBox from '../CriteriaBox';
import TimelineBox from '../TimelineBox';
import './index.less';
import zipcodes from 'zipcodes';
import config from '../../data/config';

function mapZipToState(zip) {
  return zipcodes.lookup(zip).state;
}

const ActionFullPage = (props) => {
  let mappingLogic = null;
  let state = null;
  if(props.data.zip) {
    state = mapZipToState(props.data.zip);
  }
  if(config.userInputSection && config.userInputSection.inputType === "Zip Code to State Input") {
    mappingLogic = config.userInputSection.userInputMappingLogic;
  }
  let allContent = props.data.content.map((content, i) => {
    let box = null;
    if(content.contentType === 'contentBox') {
      box = <ContentBox key={i} content={content.content} />;
    }
    else if(content.contentType === 'colorBox') {
      box = <ContentBox key={i} content={content.content} />;
    }
    else if(content.contentType === 'urlBox') {
      let url = content.url;
      if(content.userInputFieldName) {
        url = mappingLogic[state][content.userInputFieldName.fieldName];
      }
      box = <UrlBox key={i} text={content.text} url={url} />;
    }
    else if(content.contentType === 'zipcodeBox') {
      box = (
        <ZipcodeBox
          key={i}
          buttonText={content.buttonText}
          defaultZip={props.data.zip}
          urlStart={content.beginningUrlText ? content.beginningUrlText : ""}
          urlEnd={content.endUrlText ? content.endUrlText : ""}
        />
      );
    }
    else if(content.contentType === 'criteriaBox') {
      box = <CriteriaBox key={i} content={content.content} />;
    }
    else if(content.contentType === 'phoneBox') {
      let phoneNumber = content.phoneNumber ? content.phoneNumber : mappingLogic[state][content.userInputFieldName.fieldName];
      box = (
        <PhoneBox
          key={i}
          introText={content.buttonText}
          phoneNumber={phoneNumber}
        />
      );
    }
    else if(content.contentType === 'timelineBox') {
      box = (
        <TimelineBox key={i} content={content.content} title={content.title} />
      );
    }
    return (
      <div className="action_box">
        { box }
      </div>
    );
  });
  return (
    <div className="full_page_box">
      { allContent }
    </div>
  );
};

export default ActionFullPage;

ActionFullPage.propTypes = {
  textBegin: PropTypes.string.isRequired,
  img: PropTypes.string,
  textEnd: PropTypes.string
};

ActionFullPage.displayName = 'ActionFullPage';
