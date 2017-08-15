import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import UrlImage from '../UrlImage';
import './index.less';

const PhoneBox = (props) => {
  return (
    <Button
      onClick={() => { console.log('phone number'); }}
      textStyleClass="phone_button_text"
      className="phone_button"
    >
      <UrlImage image={require('../../assets/url-icon.svg')}/>
      { props.introText + " " + props.phoneNumber }
    </Button>
  );
};

export default PhoneBox;

PhoneBox.propTypes = {
  introText: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

PhoneBox.displayName = 'PhoneBox';
