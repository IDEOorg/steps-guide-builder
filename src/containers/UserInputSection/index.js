import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import TextInput from '../../components/TextInput';
import { saveInput } from '../../store/statementPage/statementPage';
import zipcodes from 'zipcodes';
import './index.less';

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
    props.saveInput(defaultZip, this.state.output.isValid);
  }
  componentDidMount(){
    this.nameInput.focus();
  }
  render() {
    let invalidMsg = null;
    let isValid = this.state.output && this.state.output.isValid ? true : false;
    if(!isValid) {
      invalidMsg = (
        <p className="invalid_message">{this.state.output.errorMsg}</p>
      );
    }
    return (
      <div>
        <h3 className="intro_text">{this.props.data.introText}</h3>
        <TextInput
          className={
            classNames({
              user_input_zipcode_box: true,
              invalid_zipcode_input: !isValid
            })
          }
          parentRef={(input) => { this.nameInput = input; }}
          onChange={(value) => {
            let output = this.validateZip(value);
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

  validateZip(zipcode) {
    let output = {
      errorMsg: '',
      isValid: true
    };
    if(zipcode.length === 0) {
      output.isValid = false;
    }
    else if(!isNumeric(zipcode)) {
      output.isValid = false;
      output.errorMsg = 'Zipcode should be all numbers.';
    }
    else if(zipcode.length !== 5) {
      output.isValid = false;
      output.errorMsg = 'Zipcode should have 5 digits.';
    }
    else if(!inZipDictionary(zipcode)) {
      output.isValid = false;
      output.errorMsg = "Zipcode isn't in our list. Try a neighboring zipcode.";
    }
    return output;

    function isNumeric(zipcode) {
      return /^\d+$/.test(zipcode);
    }
    function inZipDictionary(zipcode) {
      if(zipcodes.lookup(zipcode)) {
        return true;
      }
      return false;
    }
  }
}

function mapStateToProps(state) {
  return {
    input: state.statementPage
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
