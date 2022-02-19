import { IBook } from '@/core/base/book'
import { ISheet } from '@/core/base/sheet';



export type IStatusState = {
  desc?: string;
  detail?: string;
  progress: 'none' | 'indeterminate' | number

}


const state: IStatusState = {
  desc: '就绪',
  progress: 'none'
}

export default state;