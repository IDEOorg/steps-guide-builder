import React from 'react';
import PropTypes from 'prop-types';
import ActionBasic from '../ActionBasic';
import ActionFullPage from '../ActionFullPage';
import classNames from 'classnames';
import FormattedMsg from '../../containers/FormattedMsg';
import './index.less';
import config from '../../data/config';

const ActionPlan = (props) => {
  console.log(props);
  console.log('action plan');
  let option =  config.entryIds[props.id];
  let actions = option.actions;
  actions = actions.map((action, i) => {
    action.zip = props.zip;
    if(action.contentType === 'actionBasic') {
      return (
        <ActionBasic key={i} data={action} language={props.language} />
      );
    }
    else if(action.contentType === 'actionFullWidth') {
      return (
        <ActionFullPage key={i} data={action} language={props.language} />
      );
    }
  });

  return (
    <div className={
        classNames(
          {
            action_plan: true,
            inactive_action: !props.isCurrentOption
          }
        )}
      data-option={props.id}>
      <div className="actions_headline_section">
        <h1 className="actions_option_headline">
          <FormattedMsg>
            { option.text }
          </FormattedMsg>
        </h1>
      </div>
      {actions}
    </div>
  );
};

export default ActionPlan;

ActionPlan.propTypes = {
  id: PropTypes.string,
  language: PropTypes.string,
  isCurrentOption: PropTypes.bool
};

ActionPlan.displayName = 'ActionPlan';
