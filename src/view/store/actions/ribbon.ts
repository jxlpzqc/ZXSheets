import { IBook } from "@/core/base/book";
import { RootState } from "../state";

const ActionType = {
  changeDisabled: 'ribbon/changeDisabled',
  changeBackStageOpend: 'ribbon/changeBSOpend',
  changeActiveTab: 'ribbon/changeActiveTab',
  changeActiveStageTab: 'ribbon/changeActiveStageTab',
  fetchLocalTemplate: 'ribbon/fetchLocalTemplate',
  fetchRemoteTemplate: 'ribbon/fetchRemoteTemplate',
  cancelFetchRemoteTemplate: 'ribbon/cancelRemoteTemplate',
  newFile: 'ribbon/newFile',
  __changeRibbon: '__ribbon'
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
  changeActiveStageTab: (value: number) => ({
    type: ActionType.changeActiveStageTab,
    payload: value
  }),
  newFile: (url: string) => ({
    type: ActionType.newFile,
    payload: url
  }),
  fetchLocalTemplate: () => ({ type: ActionType.fetchLocalTemplate }),
  fetchRemoteTemplate: () => ({ type: ActionType.fetchRemoteTemplate }),
  cancelFetchRemoteTemplate: () => ({ type: ActionType.cancelFetchRemoteTemplate }),
  __changeRibbon: (value: Partial<RootState['ribbon']>) => ({
    type: ActionType.__changeRibbon,
    payload: value
  })

};

export default actions;


