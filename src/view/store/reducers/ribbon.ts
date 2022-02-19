import { Reducer } from "redux";
import { ActionTypes } from "../actions";
import ribbonState, { IRibbonState } from '../state/ribbon'

const reducer: Reducer<IRibbonState> = (state = ribbonState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.ribbon.changeActiveTab:
      return {
        ...state,
        activeTab: payload
      };
    case ActionTypes.ribbon.changeBackStageOpend:
      return {
        ...state,
        backStageOpend: payload
      };
    case ActionTypes.ribbon.changeDisabled:
      return {
        ...state,
        disabled: payload
      };
    case ActionTypes.ribbon.changeActiveStageTab:
      return {
        ...state,
        activeStageTab: payload
      };
    case ActionTypes.ribbon.__changeRibbon:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}

export default reducer;