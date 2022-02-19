import { AnyAction } from "redux";
import { combineEpics } from "redux-observable";
import { RootState } from "../state";


import ribbonEpics from "./ribbon";
import viewEpics from './view';

const epics = [
  ...ribbonEpics,
  ...viewEpics
]

const rootEpic = combineEpics<AnyAction,AnyAction,RootState>(...epics);

export default rootEpic;