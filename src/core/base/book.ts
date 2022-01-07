import { IIOHandler } from "./ioHandler";
import { IResource } from "./resource";
import { ISheet } from "./sheet";

export enum BookType {
    ZXBOOK = "zxs",
    XLSBOOK = "xls",
    XLSXBOOK = "xlsx",
}

export enum BookState {
    CLOSED,
    OPENED,
    EDITED,
}

export interface IWorkingState {
    activeSheetName: string;
}

export interface IBook {
    name: string;
    type: BookType;
    state: BookState;
    fileLocation: string;
    ioHandler: IIOHandler;

    resources: IResource[];
    sheets: ISheet[];

    workingState: IWorkingState;
    // 文档操作
    open: () => void;
    save: () => void;
    saveAs: (filename: string) => void;
    close: () => void;
}

