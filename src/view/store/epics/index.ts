import { combineEpics } from "redux-observable";


import ribbonEpics from "./ribbon";

const epics = [
  ...ribbonEpics
]

const rootEpic = combineEpics(...epics);

export default rootEpic;