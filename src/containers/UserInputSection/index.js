import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import TextInput from '../../components/TextInput';
import { saveInput } from '../../store/statementPage/statementPage';
import zipcodes from '../../data/ziptostate';
import './index.less';
import { getTranslation } from '../../globals/utils';

class UserInputSection extends Component {
  constructor(props) {
    super(props);
    let defaultZip = "";
    this.state = {
      inputText: defaultZip,
      output: {
        isValid: false,
        errorMsg: ''
      }
    };
    console.log(props);
    console.log('constructor');
    props.saveInput(defaultZip, this.state.output.isValid);
  }
  componentDidMount(){
    this.nameInput.focus();
  }
  render() {
    console.log(this.props);
    console.log('this.props user input section');
    let invalidMsg = null;
    let isValid = this.state.output && this.state.output.isValid ? true : false;
    if(!isValid) {
      invalidMsg = (
        <p className="invalid_message">{this.state.output.errorMsg}</p>
      );
    }
    return (
      <div>
        <h3 className="intro_text">{getTranslation(this.props.data.introText, this.props.language)}</h3>
        <TextInput
          className={
            classNames({
              user_input_zipcode_box: true,
              invalid_zipcode_input: !isValid
            })
          }
          parentRef={(input) => { this.nameInput = input; }}
          onChange={(value) => {
            console.log(this.props.language);
            console.log('validate zip');
            let output = this.validateZip(value, this.props.language);
            this.setState({
              inputText: value,
              output
            });
            this.props.saveInput(value, output.isValid);
          }}
          placeholder=""
          value={this.state.inputText}
        />
        { invalidMsg }
      </div>
    );
  }

  validateZip(zipcode, language) {
    let output = {
      errorMsg: '',
      isValid: true
    };
    if(zipcode.length === 0) {
      output.isValid = false;
    }
    else if(!isNumeric(zipcode)) {
      output.isValid = false;
      if(language === 'en') {
        output.errorMsg = 'Zipcode should be all numbers.';
      }
      else if(language === 'es') {
        output.errorMsg = 'El código postal debe ser todos los números.';
      }
    }
    else if(zipcode.length !== 5) {
      output.isValid = false;
      if(language === 'en') {
        output.errorMsg = 'Zipcode should have 5 digits.';
      }
      else if(language === 'es') {
        output.errorMsg = 'El código postal debe tener 5 dígitos.';
      }
    }
    else if(!inZipDictionary(zipcode)) {
      output.isValid = false;
      if(language === 'en') {
        output.errorMsg = "Zipcode isn't in our list. Try a neighboring zipcode.";
      }
      else if(language === 'es') {
        output.errorMsg = "El código postal no está en nuestra lista. Pruebe con un código postal vecino.";
      }
    }
    return output;

    function isNumeric(zipcode) {
      return /^\d+$/.test(zipcode);
    }
    function inZipDictionary(zipcode) {
      if(zipcodes[zipcode]) {
        return true;
      }
      return false;
    }
  }
}

function mapStateToProps(state) {
  return {
    input: state.statementPage,
    language: state.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveInput: (input, isValid) => dispatch(saveInput(input, isValid))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInputSection);

UserInputSection.propTypes = {
  saveInput: PropTypes.func,
  data: PropTypes.object
};

UserInputSection.displayName = 'UserInputSection';
