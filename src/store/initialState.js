import config from '../data/config';

let problems = config.problemsPage ? config.problemsPage.problems : null;
let statementPage = null;
if(problems) {
  problems = problems.map((problem) => {
    return problem.id;
  });
}
else {
  console.log('test stpg');
  statementPage = config.statementsPages[0];
  if(statementPage) {
    console.log(statementPage.statements);
    statementPage.statements = statementPage.statements.map((statementObject) => {
      return {
        id: statementObject.id,
        selected: false,
        text: config.entryIds[statementObject.id].text
      };
    });
  }
}
console.log(statementPage);

const initialState = {
  problems,
  statementPage,
  selectedOptions: {
    currentOption: null,
    options: []
  },
  language: 'en-US'
};

export default initialState;
