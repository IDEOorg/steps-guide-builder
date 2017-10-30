export const getTranslation = (field, language) => {
  if(field === undefined) {
    return "";
  }
  if(field[language]) {
    return field[language];
  }
  return field;
};
