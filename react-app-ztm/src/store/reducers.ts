import { CHANGE_SEARCH_FIELD } from "./constant";

interface InitialStateProps {
  search: string;
}

interface ChangeSearchFieldAction {
  type: typeof CHANGE_SEARCH_FIELD;
  payload: string;
}

type SearchAction = ChangeSearchFieldAction;

const initialState: InitialStateProps = {
  search: "",
};

export const searchRobotsReducer = (
  state: InitialStateProps = initialState,
  action: SearchAction,
): InitialStateProps => {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD: {
      // return Object.assign({}, state, { search: action.payload });
      return {
        ...state,
        search: action.payload,
      };
    }
    default:
      return state;
  }
};
