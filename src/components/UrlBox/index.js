import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import UrlImage from '../UrlImage';
import { keenClient } from '../../globals/tracker';
import GoogleAnalytics from 'react-ga';

import './index.less';

const UrlBox = (props) => {
  return (
    <Button
      onClick={() => {
        keenClient.recordEvent('clicks', {
          type: 'linkOut',
          action: 'clickResource',
          text: props.text || 'none',
          url: props.url || 'none'
        });
        GoogleAnalytics.event({
          category: 'ResourcesByText',
          action: 'click',
          label: props.text
        });
        GoogleAnalytics.event({
          category: 'ResourcesByURL',
          action: 'click',
          label: props.url
        });
        window.open(props.url); 
      }}
      textStyleClass="action_button_text"
      className="action_button"
      url={props.url}
    >
      <div className="urlBox-button-span">
        <UrlImage image={require('../../assets/url-icon.svg')} />
        {props.text}
      </div>
    </Button>
  );
};

export default UrlBox;

UrlBox.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

UrlBox.displayName = 'UrlBox';
