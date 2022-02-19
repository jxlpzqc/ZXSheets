import { IBook } from "@/core/base/book";
import { ISheet } from "@/core/base/sheet";

const ActionType = {
  changeCurrentBook: 'file/changeCurrentBook',
  changeCurrentSheet: 'file/changeCurrentSheet',
}

export const FileActionType = ActionType;

const actions = {
  changeCurrentBook: (value?: IBook) => ({
    type: ActionType.changeCurrentBook,
    payload: value
  }),
  changeCurrentSheet: (value?: ISheet) => ({
    type: ActionType.changeCurrentSheet,
    payload: value
  }),

};

export default actions;


