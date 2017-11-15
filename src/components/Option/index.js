import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.less';
import Link from '../Link';
import FormattedMsg from '../../containers/FormattedMsg';
import config from '../../data/config';
import { keenClient } from '../../keen';

const Option = (props) => {
  let optionText = config.entryIds[props.id].text;
  let orderBox = null;
  if(props.order !== undefined) {
    orderBox = (
      <div className="order_tag">
        <p>{props.order}</p>
      </div>
    );
  }
  let link = null;
  if(props.linkText) {
    link = (
      <Link
      className="option_tried_link"
      onClick={(e) => {
        keenClient.recordEvent('clicks', {
          type: 'ui',
          text: props.linkText || 'none'
        });

        props.onLinkClick(); 
        e.stopPropagation();
      }}>
        { props.linkText }
      </Link>
    );
  }
  return (
    <div className={
        classNames({
          option: true,
          selected_option: props.selected
        })}
        style={props.styles}
        onClick={props.onSelect}>
      <div className="option_container">
        {orderBox}
        <h2 className="option_headline"
          style={props.textStyles}>
          <FormattedMsg>
            { optionText }
          </FormattedMsg>
        </h2>
        {link}
      </div>
    </div>
  );
};

export default Option;

Option.propTypes = {
  selected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  order: PropTypes.number,
  id: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  textStyles: PropTypes.object,
  styles: PropTypes.object,
  onLinkClick: PropTypes.func.isRequired,
};

Option.displayName = 'Option';
