import { IBook } from '@/core/base/book'
import { ISheet } from '@/core/base/sheet';



export type IFileState = {
  currentBook?: IBook;
  currentSheet?: ISheet;
}


const state: IFileState = {
  currentBook: undefined,
  currentSheet: undefined
}

export default state;