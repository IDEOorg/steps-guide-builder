import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.less';

const Button = (props) => {
  return (
    <div className={classNames("button", props.className)} onClick={props.onClick}>
      <h4 className={classNames("button_text", props.textStyleClass)}>
        {props.children}
      </h4>
    </div>
  );
};

export default Button;

Button.propTypes = {
  textStyleClass: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.string
};

Button.displayName = 'Button';
