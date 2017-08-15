import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

const UrlImage = (props) => {
  return (
    <img className="url_asset_img" src={props.image} />
  );
};

export default UrlImage;

UrlImage.propTypes = {
  image: PropTypes.string.isRequired
};

UrlImage.displayName = 'UrlImage';
