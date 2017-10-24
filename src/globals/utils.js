export const getTranslation = (field, language) => {
  if(field[language]) {
    return field[language];
  }
  return "";
};
