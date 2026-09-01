import { CHANGE_SEARCH_FIELD } from "./constant";

interface InitialStateProps {
  search: string;
}

const initialState: InitialStateProps = {
  search: "",
};

export const searchRobots = (
  state: InitialStateProps = initialState,
  action: { type: string },
): InitialStateProps => {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD: {
      return;
    }
  }
};
