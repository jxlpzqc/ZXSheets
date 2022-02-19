import { BookState, BookType, IBook, IWorkingState } from "../base/book";
import { IFileDescriptor } from "../base/ioHandler";
import { ISheet } from "../base/sheet";
import { Sheet } from "../sheet/sheet";

interface IContext {
  book?: IBook;
  sheet?: ISheet;
  allBooks?: IBook[];
}

/**
 * Indicate a context, which is used to make non-absolute refs (e.g. A1) exactly (e.g. Book1/Sheet1/A1).
 */
export const Context: IContext = {
  book: undefined,
  sheet: undefined,
  allBooks: []
};

//TODO: implement it

export function openBook(url: string) {

}



const book: IBook = {
  name: "",
  type: BookType.ZXBOOK,
  state: BookState.CLOSED,
  fileLocation: "",
  ioHandler: {
    open: function (filename: string): IFileDescriptor {
      throw new Error("Function not implemented.");
    },
    read: function (fd: IFileDescriptor, content: Uint8Array): void {
      throw new Error("Function not implemented.");
    },
    write: function (fd: IFileDescriptor, content: Uint8Array): void {
      throw new Error("Function not implemented.");
    },
    seek: function (fd: IFileDescriptor, position: number): void {
      throw new Error("Function not implemented.");
    }
  },
  resources: [],
  sheets: [
    new Sheet("sheet0")
  ],
  workingState: {
    activeSheetName: ""
  },
  open: function (): void {
    this.state = BookState.OPENED;
  },
  save: function (): void {
  },
  saveAs: function (filename: string): void {
  },
  close: function (): void {
  }
}

let bid = 0;
export function createBook(templateNameUrl: string): IBook {
  book.name = (++bid).toString();
  Context.allBooks?.push(book);
  return book;
}


export function setActiveBook(book: IBook | string): void {
  if (typeof (book) == 'string') {
    const b = Context.allBooks?.find((u) => u.name == book);
    if (!b) return;
    book = b;
  }
  if (Context.book != book) {
    Context.sheet = book.sheets[0];
    Context.book = book;
  }
}
