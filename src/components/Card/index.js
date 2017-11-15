import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FormattedMsg from '../../containers/FormattedMsg';
import { keenClient } from '../../keen';
import './index.less';

const Card = (props) => {
  let choicesBox = null;
  if(props.choices) {
    let choices = Object.keys(props.choices).map((choiceId) => {
      return (
        <div key={choiceId}
          className={
            classNames({
              card_choice: true,
              card_choice_selected: choiceId === props.selectedChoice,
              card_choice_unselected: choiceId !== props.selectedChoice
            })}
          onClick={() => {
            keenClient.recordEvent('clicks', {
              type: 'select',
              action: 'selectStatementsOption'
              text: props.choices[choiceId].text || 'none',
              id: props.id || 'none'
            });
            props.onChoiceSelect(props.id, choiceId);
          }}>
          <h6>{props.choices[choiceId].text}</h6>
        </div>
      );
    });
    choicesBox = (
      <div className="choices_box">
        {choices}
      </div>
    );
  }
  let isCardSelected = false;
  let cardHasChoicesStyle = false;
  if(props.selected) {
    isCardSelected = true;
    if(props.choices) {
      cardHasChoicesStyle = true;
    }
  }

  let addIcon = <img className={"card_add_icon"} src={require('../../assets/card-add-icon.svg')} />;
  if(props.hideIcon) {
    addIcon = null;
  }
  let isFullSize = true;
  if(props.isFullSize === false) {
    isFullSize = false;
  }
  return (
    <div className={classNames({
      card_box: true,
      full_card_box: isFullSize,
      small_card_box: !isFullSize,
      card_selected: isCardSelected,
      card_unselected: !isCardSelected,
    })}>
      <div className={classNames({
        card: true,
        full_card: isFullSize,
        small_card: !isFullSize,
        card_with_choices: cardHasChoicesStyle
      })}
        onClick={() => { props.onSelect(); }}
      >
        { addIcon }
        <h2 className={"card_text"}>
          <FormattedMsg>
            {props.text}
          </FormattedMsg>
        </h2>
      </div>
      {choicesBox}
    </div>
  );
};

export default Card;

Card.propTypes = {
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onChoiceSelect: PropTypes.func,
  selectedChoice: PropTypes.string,
  choices: PropTypes.objectOf(PropTypes.objectOf(PropTypes.shape({
    text: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string)
  })))
};

Card.displayName = 'Card';
