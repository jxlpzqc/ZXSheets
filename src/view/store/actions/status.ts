import { IBook } from "@/core/base/book";
import { RootState } from "../state";

const ActionType = {
  __changeStatus: '__status'
}

export const StatusActionType = ActionType;

const actions = {  
  changeDefault: () => ({
    type: ActionType.__changeStatus,
    payload: {
      desc: '就绪',
      progress: 'none'
    }
  }),
  __changeStatus: (value: Partial<RootState['status']>) => ({
    type: ActionType.__changeStatus,
    payload: value
  })

};

export default actions;


