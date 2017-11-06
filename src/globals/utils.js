export const getTranslation = (field, language) => {
  if(field === null) {
    return "";
  }
  if(field[language]) {
    return field[language];
  }
  return field;
};
