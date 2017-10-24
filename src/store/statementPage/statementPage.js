import config from '../../data/config';
export const SELECT_STATEMENT = 'SELECT_STATEMENT';
export const GENERATE_STATEMENTS = 'GENERATE_STATEMENTS';
export const LOAD_STATEMENTS = 'LOAD_STATEMENTS';
export const SAVE_INPUT = 'SAVE_INPUT';

export function selectStatement(id) {
  return {
    type: SELECT_STATEMENT,
    id
  };
}

export function loadStatements(ids, userInput) {
  return {
    type: LOAD_STATEMENTS,
    loadedStatements: ids,
    userInput
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
      console.log(state);
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
    case LOAD_STATEMENTS: {
      console.log(state);
      if(action.userInput) {
        if(action.userInput.zip) {
          state = {
            ...state,
            userInput: {
              zip: action.userInput.zip
            }
          };
        }
      }
      if(action.problem) {
        const problemsToStatements = config.problemsPage.problemsToStatements.problemsToStatements;
        for(let i = 0; i < problemsToStatements.length; i++) {
          if(problemsToStatements[i].url.urlText === action.problem) {
            state = {
              ...state,
              url: problemsToStatements[i].url,
              navigation: problemsToStatements[i].navigation,
              sidebar: problemsToStatements[i].sidebar
            };
          }
        }
      }
      let statements = [];
      let selectedIds = action.loadedStatements.map((statement) => {
        return statement.id;
      });
      statements = config.statementsPages[0].statements.map((statementObject) => {
        let isSelected = false;
        if(selectedIds.includes(statementObject.id)) {
          isSelected = true
        }
        return {
          id: statementObject.id,
          selected: isSelected,
          text: config.entryIds[statementObject.id].text
        }
      });
      return {
        ...state,
        statements
      }
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
