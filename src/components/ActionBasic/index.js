import React from 'react';
import PropTypes from 'prop-types';
import ContentBox from '../ContentBox';
import UrlBox from '../UrlBox';
import ZipcodeBox from '../ZipcodeBox';
import PhoneBox from '../PhoneBox';
import TimelineBox from '../TimelineBox';
import CriteriaBox from '../CriteriaBox';
import ColorBox from '../ColorBox';
import './index.less';
import zipToState from '../../data/ziptostate';
import config from '../../data/config';

function mapZipToState(zip) {
  return zipToState[zip];
}

const ActionBasic = (props) => {
  let imgId = props.data.leftHandSideImage.id;
  let imgUrl = config.entryIds[imgId].url;
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
      box = <ColorBox key={i} content={content.content} />;
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
      <div key={i} className="action_box">
        { box }
      </div>
    );
  });

  return (
    <div className="action">
      <div className="action_capsule">
        <div className="action_img">
          <img src={imgUrl}/>
        </div>
        <div className="action_content">
          { allContent }
        </div>
      </div>
    </div>
  );
};

export default ActionBasic;

ActionBasic.propTypes = {
  data: PropTypes.object
};

ActionBasic.displayName = 'ActionBasic';
