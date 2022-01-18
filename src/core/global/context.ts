import { IBook } from "../base/book";
import { ISheet } from "../base/sheet";

interface GContext {
    book?: IBook;
    sheet?: ISheet
}

const Context:GContext = {
    book: undefined,
    sheet: undefined
};

const OpenedBooks: IBook[] = [];

export { Context, OpenedBooks };