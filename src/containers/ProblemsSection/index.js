import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import "./index.less";
import Card from "../../components/Card";
import ProgressBar from "../../components/ProgressBar";
import { generateStatements } from "../../store/statementPage/statementPage";
import config from "../../data/config";

const ProblemsSection = props => {
  const problems = props.problems.map(problem => {
    return (
      <Card
        key={problem.id}
        id={problem.id}
        text={problem.text}
        hideIcon={true}
        onSelect={() => {
          props.onSelect(problem.id, problem.url);
        }}
      />
    );
  });
  return (
    <div className="problems_page">
      <ProgressBar
        count={1}
        instructionText="Step 1: Choose your most pressing problem"
      />
      <div className="problems_section">{problems}</div>
    </div>
  );
};

function mapStateToProps() {
  let problemsToStatements = config.problemsPage.problemsToStatements.problemsToStatements;
  const problems = config.problemsPage.problems.map((problemId) => {
    let id = problemId.id;
    let url = null;
    for (let i = 0; i < problemsToStatements.length; i++) {
      let problemsToStatementsEntry = problemsToStatements[i];
      if (problemsToStatementsEntry.problem.id === id) {
        url = problemsToStatementsEntry.statementPage.url.urlText;
        break;
      }
    }
    return {
      id: id,
      text: config.entryIds[id].text,
      url: url
    };
  });
  return {
    problems
  };
}
/* eslint-enable no-unused-vars */

function mapDispatchToProps(dispatch) {
  return {
    onSelect: (id, url) => {
      dispatch(generateStatements(id));
      dispatch(push("/statements/" + url));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemsSection);

ProblemsSection.propTypes = {
  onSelect: PropTypes.func.isRequired,
  problems: PropTypes.array
};

ProblemsSection.displayName = "ProblemsSection";
