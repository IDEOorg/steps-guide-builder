import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import UrlImage from '../UrlImage';
import './index.less';

const UrlBox = (props) => {
  return (
    <Button
      onClick={() => { window.open(props.url); }}
      textStyleClass="action_button_text"
      className="action_button"
    >
      <UrlImage image={require('../../assets/url-icon.svg')}/>
      {props.text}
    </Button>
  );
};

export default UrlBox;

UrlBox.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

UrlBox.displayName = 'UrlBox';