import { Reducer } from "redux";
import { AnyAction } from "redux";
import { ActionTypes } from "../actions";
import { RootState } from "../state";
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
    default:
      return state;
  }
}

export default reducer;