import { IBook } from '@/core/base/book'
import { ISheet } from '@/core/base/sheet';



export type TFileState = {
  currentBook?: IBook;
  currentSheet?: ISheet;
}


const state: TFileState = {
  currentBook: undefined,
  currentSheet: undefined
}

export default state;