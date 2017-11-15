import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import marked from "marked";
import classNames from "classnames";
import "./index.less";
import Card from "../../components/Card";
import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";
import UserInputSection from "../UserInputSection";
import FormattedMsg from "../FormattedMsg";
import { selectStatement } from "../../store/statementPage/statementPage";
import { generateOptions } from "../../store/selectedOptions/selectedOptions";
import config from "../../data/config";
import { getTranslation } from "../../globals/utils";
import { keenClient } from '../../keen';

const StatementsSection = (props) => {
  let isFullSize;
  if (props.statementPage.statementPageLayout) {
    isFullSize = false;
  } else {
    isFullSize = true;
  }

  const statements = props.statementPage.statements.map(statement => {
    return (
      <Card
        key={statement.id}
        id={statement.id}
        hideIcon={props.hideIcon}
        text={statement.text}
        selected={statement.selected}
        onSelect={() => {
          props.onSelect(statement.id);
        }}
        isFullSize={isFullSize}
      />
    );
  });
  const selectedStatements = props.statementPage.statements
    .filter(statement => statement.selected)
    .map(statement => {
      // console.log(statement);
      return {
        id: statement.id
      };
    });

  let statementsSectionIntro = null;
  let introItems = [];
  // console.log('config.userInputSection');
  if (config.userInputSection) {
    if (getTranslation(config.userInputSection.inputType, props.language) === "Zip Code to State Input") {
      introItems.push(
        <UserInputSection key={1} data={config.userInputSection} />
      );
    }
    if (config.userInputSection.inputType === "Text Input") {
      let statementPageIntroText = getTranslation(config.userInputSection.introText, props.language);
      introItems.push(
        <div
          key={2}
          className="statement_page_intro_box"
          dangerouslySetInnerHTML={{ __html: marked(statementPageIntroText) }}
        />
      );
    }
  }
  if (config.progressBar) {
    introItems.push(
      <ProgressBar
        key={3}
        count={2}
        instructionText="Step 2: Select all the statements below that apply to you."
      />
    );
  }
  statementsSectionIntro = (
    <div className="statements_section_intro">{introItems}</div>
  );
  let isSubmitEnabled = false;
  if (!props.statementPage.userInput || props.statementPage.userInput.isValid) {
    isSubmitEnabled = true;
  }
  return (
    <div className="cards_page">
      {statementsSectionIntro}
      <div className="cards_section">{statements}</div>
      <div className="submit_section">
        <Button
          textStyleClass="show_options_button_text"
          className={classNames({
            show_options_button: true,
            button_is_disabled: !isSubmitEnabled
          })}
          onClick={() => {
            if (isSubmitEnabled) {
              props.onSubmit(selectedStatements, props.statementPage, props.language);
            }
          }}
        >
          <FormattedMsg>
            {config.guideMaterials.showOptionsText}
          </FormattedMsg>
        </Button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    statementPage: state.statementPage,
    language: state.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSelect: id => dispatch(selectStatement(id)),
    onSubmit: (selectedStatements, statementPage, language) => {
      const statements = selectedStatements.map(statement => {
        return statement.id;
      });
      let searchString = `?statements=${statements.join("+")}`;
      if (statementPage.userInput) {
        if (statementPage.userInput.zip) {
          searchString += `&zip=${statementPage.userInput.zip}`;
        }
      }
      let url = statementPage.url ? statementPage.url.urlText : null;
      url = getTranslation(url, language);

      keenClient.recordEvent('submits', {
        type: 'custom',
        action: 'submitStatements',
        query: searchString || 'none',
        zipCode: statementPage.userInput.zip || 'none'
      });

      statements.forEach(statement => {
        keenClient.recordEvent('clicks', {
          type: 'select',
          action: 'selectStatement',
          id: statement.id || 'none',
          text: statement.text || 'none'
        });
      });
  
      if (url) {
        if (!window.history) {
          console.log("does not support window.history");
        }
        dispatch(push(`/statements/${url}/options${searchString}`));
      } else {
        if (!window.history) {
          console.log("does not support window.history");
        }
        dispatch(push(`/options${searchString}`));
      }
      dispatch(generateOptions(selectedStatements, statementPage));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatementsSection);

StatementsSection.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  statementPage: PropTypes.object
};

StatementsSection.displayName = "StatementsSection";
