import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import MediaQuery from 'react-responsive';
import './index.less';
import { selectOption, markTried, toggleOption } from '../../store/selectedOptions/selectedOptions';
import Option from '../../components/Option';
import OptionsIntro from '../../components/OptionsIntro';
import ActionPlan from '../../components/ActionPlan';
import TriedOptions from '../TriedOptions';
import config from '../../data/config';

class OptionsPage extends Component {
  constructor(props){
     super(props);
  }
  componentWillMount() {
    window.scrollTo(0,0);
  }
  componentDidUpdate() {
    this.scrollOnOptionSelectMobile(this.props.currentOption);
  }
  onScroll() {
    let actionPlans = this.actionSection.children;
    let height = Math.max(document.documentElement.clientHeight, window.innerHeight);
    let currentOptionHeight = -1;
    let currentOption = null;
    for(let i = 0; i < actionPlans.length; i++) {
      let actionPlanHeight = actionPlans[i].getBoundingClientRect().top;
      if(actionPlanHeight >= 0 && actionPlanHeight <= (height / 4) && actionPlanHeight > currentOptionHeight) {
        currentOptionHeight = actionPlanHeight;
        currentOption = actionPlans[i].dataset.option;
      }
    }
    if(currentOption !== null && currentOption !== this.props.currentOption) {
      this.props.toggleOption(currentOption);
    }
  }
  scrollOnOptionSelect(id) {
    if(id !== this.props.currentOption) {
      let actionPlans = this.actionSection.children;
      for(let i = 0; i < actionPlans.length; i++) {
        if(actionPlans[i].dataset.option === id) {
          this.actionSection.scrollTop += actionPlans[i].getBoundingClientRect().top - 20 - 50;
          return;
        }
      }
    }
  }
  scrollOnOptionSelectMobile(id) {
    let options = document.getElementsByClassName('option_box_mobile');
    for(let i = 0; i < options.length; i++) {
      if(options[i].dataset.option === id) {
        window.scrollBy(0, options[i].getBoundingClientRect().top - 50); // 50 is header height
        break;
      }
    }
  }
  render() {
    const currentOption = this.props.currentOption;
    const filteredOptions = this.props.options.filter((option) => !option.tried);

    let options = null;
    let actionPlans = null;
    let optionsActionsOutputMobile = null;
    if(filteredOptions.length) {
      // desktop
      options = filteredOptions.map((option, i) => {
        let id = option.id;
        let onLinkClick = () => {this.props.markTried(id);};
        let onSelect = () => {this.scrollOnOptionSelect(id); this.props.onSelect(id);};
        return generateOption(id, currentOption, i + 1, onLinkClick, onSelect);
      });
      actionPlans = filteredOptions.map((option) => {
        let id = option.id;
        return generateActionPlan(id, currentOption, this.props.zipcode);
      });
      // mobile
      optionsActionsOutputMobile = filteredOptions.map((option, i) => {
        let id = option.id;
        let optionBox = null;
        if(filteredOptions.length) {
          let onLinkClick = () => {this.props.markTried(id);};
          let onSelect = () => {
            this.props.onSelect(id);
            this.scrollOnOptionSelectMobile(id);
          };
          optionBox = (
            <div data-option={id} className="option_box_mobile">
              { generateOption(id, currentOption, i + 1, onLinkClick, onSelect) }
            </div>
          );
        }
        return (
          <div key={id}>
            {optionBox}
            <div className="action_plan_mobile">
              { generateActionPlan(id, currentOption, this.props.zipcode) }
            </div>
          </div>
        );
      });
    }
    else {
      console.log('show something distinctive');
    }
    let navigation = config.optionsPage.navigation;
    let optionsIntro = null;
    if(navigation) {
      optionsIntro = (
        <OptionsIntro
          headlineText={navigation.title}
          goBackText={navigation.linkText}
          goBack={() => {
            if(this.props.params.statement) {
              this.props.goBack('/statements/' + this.props.params.statement);
            }
            else {
              this.props.goBack('/');
            }
          }}
        />
      );
    }
    return (
      <div className="options_container">
        <MediaQuery query="(min-width: 600px)">
          <div className="options_page">
            <div className="options_section">
              { optionsIntro }
              { options }
              <TriedOptions />
            </div>
            <div
              className="actions_section"
              ref={(actionSection) => {this.actionSection = actionSection;}}
              onScroll={() => {this.onScroll();}}>
              {actionPlans}
            </div>
          </div>
        </MediaQuery>
        <MediaQuery query="(max-width: 600px)">
          <div className="options_page">
            { optionsIntro }
            { optionsActionsOutputMobile }
            <TriedOptions />
          </div>
        </MediaQuery>
      </div>
    );
  }
}

function generateActionPlan(id, currentOption, zipcode) {
  return (
    <ActionPlan
      key={id}
      id={id}
      isCurrentOption={currentOption === id}
      zip={zipcode}
    />
  );
}

function generateOption(id, currentOption, order, onLinkClick, onSelect) {
  return (
    <Option
      key={id}
      id={id}
      selected={id === currentOption}
      order={order}
      onLinkClick={onLinkClick}
      linkText={"I've already tried this."}
      onSelect={onSelect}
    />
  );
}

function mapStateToProps(state) {
  let userInput = state.statementPage.userInput;
  let zipcode = null;
  if(userInput) {
    zipcode = userInput.zip ? userInput.zip : null;
  }
  return {
    options: state.selectedOptions.options,
    currentOption: state.selectedOptions.currentOption,
    zipcode: zipcode
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goBack: (statement) => {
      dispatch(push(statement));
    },
    onSelect: (id) => dispatch(selectOption(id)),
    markTried: (id) => dispatch(markTried(id)),
    toggleOption: (id) => dispatch(toggleOption(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionsPage);

OptionsPage.propTypes = {
  currentOption: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    tried: PropTypes.bool.isRequired
    })
  ),
  toggleOption: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  goBack: PropTypes.func.isRequired,
  markTried: PropTypes.func,
};

OptionsPage.displayName = 'Options Page';
