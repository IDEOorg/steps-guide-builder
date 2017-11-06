export const SELECT_LANGUAGE = 'SELECT_LANGUAGE';

export function selectLanguage(language) {
  return {
    type: SELECT_LANGUAGE,
    payload: {
      language,
    }
  };
}

const language = (state = [], action) => {
  switch (action.type) {
    case SELECT_LANGUAGE: {
      return action.payload.language;
    }
    default:
      return state;
  }

};

export default language;
