import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Option from '../../components/Option';
import { addTriedBack } from '../../store/selectedOptions/selectedOptions';
import './index.less';

class TriedOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }
  render() {
    let triedOptions = null;
    let triedOptionsIcon = require('../../assets/more-icon.svg');
    if(this.state.isExpanded) {
      triedOptions = this.props.triedOptions.map((triedOption) => {
        return (
          <Option key={triedOption.id}
            id={triedOption.id}
            linkText={"Add back to my options"}
            styles={{background: '#f6f7f8'}}
            textStyles={{color: 'rgb(70,70,70)'}}
            onLinkClick={() => {
              this.props.addTriedBack(triedOption.id);
            }}
          />
        );
      });
      triedOptionsIcon = require('../../assets/exit-icon.svg');
    }
    let triedOptionsEnabled = true;
    if(this.props.triedOptions.length === 0) {
      triedOptionsEnabled = false;
    }
    let triedText = "Options I've already tried";
    return (
      <div className={
          classNames({
            tried_options: true,
            tried_options_disabled: !triedOptionsEnabled
          })}
      >
        <div className="already_tried_toggle_box"
          onClick={() =>{
            this.setState({isExpanded: !this.state.isExpanded});
          }}>
          <img src={triedOptionsIcon} />
          <h3>{ triedText }</h3>
        </div>
        {triedOptions}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    triedOptions: state.selectedOptions.options.filter((option) => option.tried)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addTriedBack: (id) => dispatch(addTriedBack(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TriedOptions);

TriedOptions.propTypes = {
  triedOptions: PropTypes.object,
  addTriedBack: PropTypes.func.isRequired
};

TriedOptions.displayName = 'TriedOptions';
