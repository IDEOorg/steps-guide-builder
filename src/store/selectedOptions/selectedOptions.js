export const GENERATE_OPTIONS = 'GENERATE_OPTIONS';
export const SELECT_OPTION = 'SELECT_OPTION';
export const MARK_TRIED = 'MARK_TRIED';
export const ADD_TRIED_BACK = 'ADD_TRIED_BACK';
export const TOGGLE_OPTION = 'TOGGLE_OPTION';

export function generateOptions(statements, statementPage) {
  console.log(statements);
  console.log('statements');
  console.log(statementPage);
  let selectedStatements = statements.map((statement) => {
    return statement.id;
  });
  let allStatements = statementPage.statements.map((statement) => {
    return statement.id;
  });
  return {
    type: GENERATE_OPTIONS,
    selectedStatements,
    allStatements,
    statementsToOptions: statementPage.statementsToOptions.statementsToOptions
  };
}

export function selectOption(id) {
  return {
    type: SELECT_OPTION,
    id
  };
}

export function markTried(id) {
  return {
    type: MARK_TRIED,
    id
  };
}
export function addTriedBack(id) {
  return {
    type: ADD_TRIED_BACK,
    id
  };
}

export function toggleOption(id) {
  return {
    type: TOGGLE_OPTION,
    id
  };
}

const selectedOptions = (state = {}, action) => {
  switch (action.type) {
    case GENERATE_OPTIONS: {
      let selectedStatements = action.selectedStatements;
      let allStatements = action.allStatements;
      let statementsToOptions = action.statementsToOptions;
      let distinctOptionIds = [];
      for(let i = 0; i < statementsToOptions.length; i++) {
        let rule = statementsToOptions[i];
        let statementRules = rule.statementRules;
        let allRulesMet = true;
        if(!rule.statementRules) {
          if(distinctOptionIds.length !== 0) {
            allRulesMet = false;
          }
        }
        else {
          console.log('statementrules');
          console.log(rule);
          for(let j = 0; j < statementRules.length; j++) {
            let statementRule = statementRules[j];
            let isSelected = statementRule.selected;
            let statementId = statementRule.statement.id;
            if(isSelected) {
              if(!selectedStatements.includes(statementId)) {
                allRulesMet = false;
              }
            }
            else {
              if(selectedStatements.includes(statementId) || !allStatements.includes(statementId)) {
                allRulesMet = false;
              }
            }
            if(!allRulesMet) {
              break;
            }
          }
        }
        if(allRulesMet) {
          console.log('rule.options');
          console.log(rule.options);
          let options = rule.options;
          if(rule.override) {
            distinctOptionIds = [];
          }
          for(let j = 0; j < options.length; j++) {
            let optionId = options[j].id;
            if(!distinctOptionIds.includes(optionId)) {
              distinctOptionIds.push(optionId);
            }
          }

          if(rule.override) {
            break;
          }
        }
      }
      console.log('distinctOptionIds');
      console.log(distinctOptionIds);
      let distinctOptions = distinctOptionIds.map((id) => {
        return {
          id,
          tried: false
        };
      });
      return {
        currentOption: distinctOptionIds[0],
        options: distinctOptions
      };
    }
    case SELECT_OPTION: {
      return {
        ...state,
        currentOption: action.id
      };
    }
    case MARK_TRIED: {
      let options = state.options.map((option) => {
        let tried = option.id === action.id ? true : option.tried;
        return {
          id: option.id,
          tried
        };
      });
      let filteredOptions = state.options.filter((option) => {
        return !option.tried;
      });
      let currentOption = null;
      if(action.id !== state.currentOption) {
        currentOption = state.currentOption;
      }
      else if(filteredOptions.length < 2) {
        currentOption = null;
      }
      else {
        for(let i = 0; i < filteredOptions.length; i++) {
          if(action.id === filteredOptions[i].id) {
            if(i < filteredOptions.length - 1) {
              currentOption = filteredOptions[i + 1].id;
            }
            else {
              currentOption = filteredOptions[i - 1].id;
            }
          }
        }
      }
      return {
        currentOption,
        options
      };
    }
    case ADD_TRIED_BACK: {
      let untriedOptions = state.options.filter((option) => !option.tried);
      let options = state.options.map((option) => {
        let tried = option.id === action.id ? false : option.tried;
        return {
          id: option.id,
          tried
        };
      });
      if(untriedOptions.length === 0) {
        return {
          currentOption: action.id,
          options
        };
      }
      else {
        return {
          ...state,
          options
        };
      }

    }
    case TOGGLE_OPTION: {
      return {
        currentOption: action.id,
        options: state.options
      };
    }
    default:
      return state;
  }

};

export default selectedOptions;
