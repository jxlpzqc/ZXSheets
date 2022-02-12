import { combineReducers } from "redux";
import { RootState } from "../state";
import view from './view'


const rootReducers = combineReducers<RootState>({
  view
});

export default rootReducers;