import config from '../data/config';

let problems = config.problemsPage ? config.problemsPage.problems : null;
let statementPage = null;
if(problems) {
  problems = problems.map((problem) => {
    return problem.id;
  });
}
else {
  statementPage = config.statementsPages[0];
  if(statementPage) {
    statementPage.statements = statementPage.statements.map((statementObject) => {
      return {
        id: statementObject.id,
        selected: false,
        text: config.entryIds[statementObject.id].text
      };
    });
  }
}

const initialState = {
  problems,
  statementPage,
  selectedOptions: {
    currentOption: null,
    options: []
  }
};

export default initialState;
