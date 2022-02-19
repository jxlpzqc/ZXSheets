import { AnyAction } from "redux";
import { combineEpics } from "redux-observable";
import { RootState } from "../state";


import ribbonEpics from "./ribbon";

const epics = [
  ...ribbonEpics
]

const rootEpic = combineEpics<AnyAction,AnyAction,RootState>(...epics);

export default rootEpic;