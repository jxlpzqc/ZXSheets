import { Action, AnyAction } from "redux";
import { Observable } from "rxjs";
import { combineEpics, Epic, ofType, StateObservable } from "redux-observable";
import { RootState } from "../state";

function fetchWhiskiesEpic(action$: Observable<AnyAction>, store$: StateObservable<RootState>) { // action$ is a stream of actions
  // action$.ofType is the outer Observable
  return action$.pipe(
    ofType("Set")
  )
}


const epics = [
  fetchWhiskiesEpic
]

const rootEpic = combineEpics(...epics);

export default rootEpic;