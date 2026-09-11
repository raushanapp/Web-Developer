import { CHANGE_SEARCH_FIELD } from "./constant";

export const setSearchField = (text: string) => {
  // console.log(text);
  return {
    type: CHANGE_SEARCH_FIELD,
    payload: text,
  };
};
