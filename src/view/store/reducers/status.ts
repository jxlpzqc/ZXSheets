import { Reducer } from "redux";
import { ActionTypes } from "../actions";
import statusState, { IStatusState } from "../state/status";

const reducer: Reducer<IStatusState> = (state = statusState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.status.__changeStatus:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}

export default reducer;