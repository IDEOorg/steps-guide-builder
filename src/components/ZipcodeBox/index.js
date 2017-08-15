import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import UrlBox from '../UrlBox';
import './index.less';

export default class ZipcodeBox extends Component {
  constructor(props) {
    super(props);
    let defaultZip = props.defaultZip ? props.defaultZip : '';
    this.state = {inputText: defaultZip};
  }
  render() {
    return (
      <div className="zipcode_box">
        <div className="zipcode_input_box">
          <TextInput
            className="zipcode_input"
            onChange={(value) => {this.setState({inputText: value});}}
            placeholder="MY ZIP CODE"
            value={this.state.inputText}/>
        </div>
        <UrlBox url={this.props.urlStart + this.state.inputText + this.props.urlEnd} text={this.props.buttonText}/>
      </div>
    );
  }
}

ZipcodeBox.propTypes = {
  urlStart: PropTypes.string.isRequired,
  urlEnd: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  defaultZip: PropTypes.string.isRequired
};

ZipcodeBox.displayName = 'ZipcodeBox';
