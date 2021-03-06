import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import Link from '../Link';
import FormattedMsg from '../../containers/FormattedMsg';

const OptionsIntro = (props) => {
  return (
    <div className="options_intro_section">
      <h1 className="options_intro_headline">
        <FormattedMsg>
          {props.headlineText}
        </FormattedMsg>
      </h1>
      <Link className="options_intro_back" onClick={props.goBack}>
        <FormattedMsg>
          {props.goBackText}
        </FormattedMsg>
      </Link>
    </div>
  );
};

export default OptionsIntro;

OptionsIntro.propTypes = {
  goBack: PropTypes.func.isRequired,
  goBackText: PropTypes.string.isRequired,
  headlineText: PropTypes.string.isRequired,
};

OptionsIntro.displayName = 'OptionsIntro';
