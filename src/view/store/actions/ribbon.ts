import { IBook } from "@/core/base/book";
import { ISheet } from "@/core/base/sheet";

const ActionType = {
  changeDisabled: 'ribbon/changeDisabled',
  changeBackStageOpend: 'ribbon/changeBSOpend',
  changeActiveTab: 'ribbon/changeActiveTab'
}

export const RibbonActionType = ActionType;

const actions = {
  changeDisabled: (value: boolean | string[]) => ({
    type: ActionType.changeDisabled,
    payload: value
  }),
  changeBackStageOpend: (value: boolean) => ({
    type: ActionType.changeBackStageOpend,
    payload: value
  }),
  changeActiveTab: (value: number) => ({
    type: ActionType.changeActiveTab,
    payload: value
  }),

};

export default actions;


