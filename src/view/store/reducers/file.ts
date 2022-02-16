import { Reducer } from "redux";
import { ActionTypes } from "../actions";
import fileState, { TFileState } from '../state/file'

const reducer: Reducer<TFileState> = (state = fileState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.file.changeCurrentBook:
      return {
        ...state,
        currentBook: payload
      };
    case ActionTypes.file.changeCurrentSheet:
      return {
        ...state,
        currentSheet: payload
      };
    case '__file':
      return {
        ...state,
        ...payload
      }
    default:
      return state;
  }
}

export default reducer;