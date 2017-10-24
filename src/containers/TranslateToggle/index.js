import React from 'react';
import { connect } from 'react-redux';
import { selectLanguage } from '../../store/language/language';
import './index.less';

const CODE_EN = 'en-US';
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
