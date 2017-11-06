import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import UrlImage from '../UrlImage';
import './index.less';

const PhoneBox = (props) => {
  console.log(props);
  console.log('phone boxxx');
  return (
    <Button
      onClick={() => { console.log('phone number'); }}
      textStyleClass="phone_button_text"
      className="phone_button"
    >
      <UrlImage image={require('../../assets/url-icon.svg')} />
      {<a href={"tel:+" + props.phoneNumber}>{props.introText + " " + props.phoneNumber}</a>}
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
