export const CHANGE_NAV = 'CHANGE_NAV';
export const MAIN_PAGE = 'MAIN_PAGE';
export const OPTIONS_PAGE = 'OPTIONS_PAGE';

export function changeNav(page) {
  return {
    type: CHANGE_NAV,
    page
  };
}

const nav = (state = [], action) => {
  switch (action.type) {
    case CHANGE_NAV:
      return action.page;
    default:
      return state;
  }
};

export default nav;
