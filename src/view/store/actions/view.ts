import { AnyAction } from "redux"
import { ActionMap } from ".";
import { ICell } from "../../../core/base/cell";
import { RootState } from "../state";

const ActionType = {
  changeActiveRibbonTab: 'view/changeActiveRibbonTab',
  changeEnabled: 'view/changeEnabled',
  changeSelectedSheetID: 'view/changeSelectedSheetID',
  changeSelection: 'view/changeSelection',
  changeFocusedCellID: 'view/changeFocusedCellID',
  changeFocusedCell: 'view/changeFocusedCell',
  changeTempFocusedCellContent: 'view/changeTempFocusedCellContent',
  submitContentChange: 'view/submitContentChange',
  cancelContentChange: 'view/cancelContentChange',
  changeZoom: 'view/changeZoom',
  startUpdate: 'view/startUpdate',
  finishUpdate: 'view/finishUpdate',
  __changeView: '__view'
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
  changeSelection: (value: string[]) => ({
    type: ActionType.changeSelection,
    payload: value
  }),
  changeFocusedCellID: (value: string) => ({
    type: ActionType.changeFocusedCellID,
    payload: value
  }),
  changeTempFocusedCellContent: (value: string) => ({
    type: ActionType.changeTempFocusedCellContent,
    payload: value
  }),
  changeZoom: (value: number) => ({
    type: ActionType.changeZoom,
    payload: value
  }),
  startUpdate: () => ({
    type: ActionType.startUpdate
  }),
  finishUpdate: () => ({
    type: ActionType.finishUpdate
  }),
  submitContentChange: () => ({
    type: ActionType.submitContentChange
  }),
  cancelContentChange: () => ({
    type: ActionType.cancelContentChange
  }),
  __changeView: (view: Partial<RootState['view']>) => ({
    type: ActionType.__changeView,
    payload: view
  })

};

export default actions;


