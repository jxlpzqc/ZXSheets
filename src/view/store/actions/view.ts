import { AnyAction } from "redux"
import { ActionMap } from ".";
import { ICell } from "../../../core/base/cell";

const ActionType = {
  changeActiveRibbonTab: 'changeActiveRibbonTab',
  changeEnabled: 'changeEnabled',
  changeSelectedSheetID: 'changeSelectedSheetID',
  changeSelection: 'changeSelection',
  changeFocusedCell: 'changeFocusedCell'
}

export const ViewActionType = ActionType;

const actions: ActionMap = {
  changeActiveRibbonTab: (value: string) => ({
    type: ActionType.changeActiveRibbonTab,
    payload: value
  }),
  changeEnabled: (value: boolean) => ({
    type: ActionType.changeEnabled,
    payload: value
  }),
  changeSelectedSheetID: (value: number) => ({
    type: ActionType.changeSelectedSheetID,
    payload: value
  }),
  changeSelection: (value: { start: string, end: string }) => ({
    type: ActionType.changeSelection,
    payload: value
  }),
  changeFocusedCell: (value: ICell) => ({
    type: ActionType.changeFocusedCell,
    payload: value
  }),
};


export default actions;


