import { AnyAction } from "redux";
import file, { FileActionType } from "./file";
import ribbon, { RibbonActionType } from "./ribbon";
import view, { ViewActionType } from "./view";
import status, { StatusActionType } from "./status";

export interface ActionMap {
  [key: string]: (...values: any[]) => AnyAction
}

const actionsCreator = {
  view,
  file,
  ribbon,
  status
}

export const ActionTypes = {
  view: ViewActionType,
  file: FileActionType,
  ribbon: RibbonActionType,
  status: StatusActionType
}

export default actionsCreator;
