import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { searchRobotsReducer } from "./reducers";
import { createLogger } from "redux-logger";

const logger = createLogger();

const rootReducer = combineReducers({
  roboSearch: searchRobotsReducer,
});

export const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(logger),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
