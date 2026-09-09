import { legacy_createStore as createStore, combineReducers } from "redux";
import { searchRobotsReducer } from "./reducers";

const rootReducer = combineReducers({
  roboSearch: searchRobotsReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
