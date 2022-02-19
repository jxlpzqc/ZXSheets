import { combineReducers } from "redux";
import { RootState } from "../state";
import view from './view';
import file from './file';
import ribbon from "./ribbon";
import status from "./status";

const rootReducers = combineReducers<RootState>({
  view,
  file,
  ribbon,
  status
});

export default rootReducers;