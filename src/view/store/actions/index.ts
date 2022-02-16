import { AnyAction } from "redux";
import file, { FileActionType } from "./file";
import view, { ViewActionType } from "./view";

export interface ActionMap {
  [key: string]: (...values: any[]) => AnyAction
}

const actionsCreator = {
  view,
  file
}

export const ActionTypes = {
  view: ViewActionType,
  file: FileActionType
}

export default actionsCreator;
