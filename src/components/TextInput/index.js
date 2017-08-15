import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.less';

export default class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.value ? this.props.value : ""};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({value: e.target.value}, () => {
      if(this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    });
  }
  render() {
    return (
      <input className={classNames(this.props.className, "textinput")}
        type="text" value={this.state.value}
        onChange={this.handleChange}
        placeholder={this.props.placeholder}
        ref={this.props.parentRef}
      />
    );
  }
}

TextInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string
};

TextInput.displayName = 'TextInput';
