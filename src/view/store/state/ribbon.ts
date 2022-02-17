import { IBook } from '@/core/base/book'
import { ISheet } from '@/core/base/sheet';



export type TFileState = {
  disabled: boolean | string[],
  backStageOpend: boolean,
  activeTab: number
}


const state: TFileState = {
  disabled: false,
  backStageOpend: false,
  activeTab: 0
}

export default state;