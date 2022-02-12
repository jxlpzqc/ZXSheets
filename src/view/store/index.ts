import { applyMiddleware, createStore } from "redux";
import {createEpicMiddleware} from 'redux-observable';
;

import reducers from "./reducers";
import epics from './epics';



const epicsMiddleware = createEpicMiddleware();

const store = createStore(reducers, applyMiddleware(epicsMiddleware));

// epicsMiddleware.run(epics);