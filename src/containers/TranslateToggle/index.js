import React from 'react';
import { connect } from 'react-redux';
import { selectLanguage } from '../../store/language/language';
import { keenClient } from '../../globals/tracker';
import GoogleAnalytics from 'react-ga';

import './index.less';

const CODE_EN = 'en';
const CODE_ES = 'es';

const TranslateToggle = (props) => {
  let switchTo = null;
  let switchToCode = null;
  if(props.language === CODE_EN) {
    switchTo = 'Español';
    switchToCode = CODE_ES;
  }
  else if(props.language === CODE_ES) {
    switchTo = 'English';
    switchToCode = CODE_EN;
  }
  return (
    <div className="toggle_box">
      <a onClick={() => {
        keenClient.recordEvent('clicks', {
          type: 'ui',
          action: 'toggleLanguage',
          text: switchTo || 'none',
          switchToCode: switchToCode || 'none'
        });

        GoogleAnalytics.event({
        category: 'UIActions',
        action: 'click',
        label: `toggle language to ${switchTo || 'none'}`
      });
        props.translate(switchToCode);
      }}>
        <p className="toggle_text">
          { switchTo }
        </p>
      </a>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    language: state.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    translate: (language) => {
      dispatch(selectLanguage(language));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TranslateToggle);

TranslateToggle.displayName = 'TranslateToggle';
