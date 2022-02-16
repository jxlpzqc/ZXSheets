import { Reducer } from "redux";
import { ActionTypes } from "../actions";
import { TViewState } from "../state/view";
import viewState from '../state/view'

const reducer: Reducer<TViewState> = (state = viewState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.view.changeActiveRibbonTab:
      return {
        ...state,
        activeRibbionTab: payload
      };
    case ActionTypes.view.changeEnabled:
      return {
        ...state,
        enabled: payload
      }
    case ActionTypes.view.changeSelectedSheetID:
      return {
        ...state,
        selectedSheetID: payload
      }
    case ActionTypes.view.changeSelection:
      return {
        ...state,
        selectedSheetID: payload
      }
    case ActionTypes.view.changeFocusedCellID:
      return {
        ...state,
        focusedCellID: payload
      }
    case ActionTypes.view.changeFocusedCell:
      return {
        ...state,
        focusedCell: payload
      }
    case ActionTypes.view.changeFocusedCellContent:
      return {
        ...state,
        focusedCellContent: payload
      }
    case ActionTypes.view.startUpdate:
      return {
        ...state,
        shouldUpdate:true
      }
    case ActionTypes.view.finishUpdate:
      return {
        ...state,
        shouldUpdate:false
      }

    case '__view':
      return {
        ...state,
        ...payload
      }
    default:
      return state;
  }
}

export default reducer;