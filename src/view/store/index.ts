import { AnyAction, applyMiddleware, createStore } from "redux";
import {createEpicMiddleware} from 'redux-observable';
;

import reducers from "./reducers";
import epics from './epics';
import { RootState } from "./state";



const epicsMiddleware = createEpicMiddleware<AnyAction,AnyAction,RootState,any>();

const store = createStore(reducers, applyMiddleware(epicsMiddleware));

epicsMiddleware.run(epics);

export default store;
