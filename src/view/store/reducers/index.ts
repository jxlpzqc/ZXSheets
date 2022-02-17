import { combineReducers } from "redux";
import { RootState } from "../state";
import view from './view';
import file from './file';
import ribbon from "./ribbon";

const rootReducers = combineReducers<RootState>({
  view,
  file,
  ribbon
});

export default rootReducers;