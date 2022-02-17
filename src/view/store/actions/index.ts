import { AnyAction } from "redux";
import file, { FileActionType } from "./file";
import ribbon,{ RibbonActionType } from "./ribbon";
import view, { ViewActionType } from "./view";

export interface ActionMap {
  [key: string]: (...values: any[]) => AnyAction
}

const actionsCreator = {
  view,
  file,
  ribbon
}

export const ActionTypes = {
  view: ViewActionType,
  file: FileActionType,
  ribbon:RibbonActionType
}

export default actionsCreator;
