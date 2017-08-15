import config from '../../data/config';
export const SELECT_STATEMENT = 'SELECT_STATEMENT';
export const GENERATE_STATEMENTS = 'GENERATE_STATEMENTS';
export const SAVE_INPUT = 'SAVE_INPUT';

export function selectStatement(id) {
  return {
    type: SELECT_STATEMENT,
    id
  };
}

export function generateStatements(problemId) {
  return {
    type: GENERATE_STATEMENTS,
    problemId
  };
}

export function saveInput(input, isValid) {
  return {
    type: SAVE_INPUT,
    input,
    isValid
  };
}

const statementPage = (state = [], action) => {
  switch (action.type) {
    case SELECT_STATEMENT: {
      let newStatements = state.statements.map((c) => {
        if (c.id !== action.id) {
          return c;
        }
        return {
          ...c,
          selected: !c.selected
        };
      });
      return {
        ...state,
        statements: newStatements
      };
    }
    case GENERATE_STATEMENTS: {
      let problemId = action.problemId;
      let problemsToStatements = config.problemsPage.problemsToStatements.problemsToStatements;
      let statementPage = null;
      for(let i = 0; i < problemsToStatements.length; i++) {
        let problemsToStatementsEntry = problemsToStatements[i];
        if(problemsToStatementsEntry.problem.id === problemId) {
          statementPage = problemsToStatementsEntry.statementPage;
          break;
        }
      }
      if(statementPage) {
        statementPage.statements = statementPage.statements.map((statementObject) => {
          return {
            id: statementObject.id,
            selected: false,
            text: config.entryIds[statementObject.id].text
          };
        });
        return statementPage;
      }
      return {};
    }
    case SAVE_INPUT: {
      return {
        ...state,
        userInput: {
          zip: action.input,
          isValid: action.isValid
        }
      };
    }
    default:
      return state;
  }
};

export default statementPage;
