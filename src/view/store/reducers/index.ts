import { combineReducers } from "redux";
import { RootState } from "../state";
import view from './view';
import file from './file';

const rootReducers = combineReducers<RootState>({
  view,
  file
});

export default rootReducers;