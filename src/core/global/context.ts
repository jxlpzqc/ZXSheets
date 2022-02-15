import { IBook } from "../base/book";
import { ISheet } from "../base/sheet";

interface GContext {
    book?: IBook;
    sheet?: ISheet
}

/**
 * Indicate a context, which is used to make non-absolute refs (e.g. A1) exactly (e.g. Book1/Sheet1/A1).
 */
const Context:GContext = {
    book: undefined,
    sheet: undefined
};

const OpenedBooks: IBook[] = [];

export { Context, OpenedBooks };