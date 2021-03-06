import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import UrlBox from '../UrlBox';
import './index.less';
import {getTranslation} from '../../globals/utils';
import config from '../../data/config';

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
            placeholder={getTranslation(config.guideMaterials.zipCodeBoxPlaceholder, this.props.language)}
            value={this.state.inputText}/>
        </div>
        <UrlBox url={getTranslation(this.props.urlStart, this.props.language) + this.state.inputText + getTranslation(this.props.urlEnd, this.props.language)} text={this.props.buttonText}/>
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
