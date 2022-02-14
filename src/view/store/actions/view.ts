import { AnyAction } from "redux"
import { ActionMap } from ".";
import { ICell } from "../../../core/base/cell";

const ActionType = {
  changeActiveRibbonTab: 'changeActiveRibbonTab',
  changeEnabled: 'changeEnabled',
  changeSelectedSheetID: 'changeSelectedSheetID',
  changeSelection: 'changeSelection',
  changeFocusedCellID: 'changeFocusedCellID',
  changeFocusedCell: 'changeFocusedCell',
  changeFocusedCellContent: 'changeFocusedCellContent'
}

export const ViewActionType = ActionType;

const actions = {
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
  changeFocusedCellID: (value: string) => ({
    type: ActionType.changeFocusedCellID,
    payload: value
  }),
  changeFocusedCellContent: (value: string) => ({
    type: ActionType.changeFocusedCellContent,
    payload: value
  })
};

export default actions;

