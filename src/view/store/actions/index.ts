import { AnyAction } from "redux";
import view, { ViewActionType } from "./view";

export interface ActionMap {
  [key: string]: (...values: any[]) => AnyAction
}

const actionsCreator = {
  view
}

export const ActionTypes = {
  view: ViewActionType
}

export default actionsCreator;
