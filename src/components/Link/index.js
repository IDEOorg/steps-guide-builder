import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.less';

const Link = (props) => {
  return (
    <a className={classNames("link", props.className)} onClick={props.onClick}>
      <p>{props.children}</p>
    </a>
  );
};

export default Link;

Link.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired
};

Link.displayName = 'Link';
