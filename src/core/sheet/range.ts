import { ICell } from "../base/cell";
import { IRange } from "../base/range";

export class Range implements IRange {

    getAllCells(): ICell[] {
        throw new Error("Method not implemented.");
    }
    constructor(public desc: string) {

    }

}

/**
 * 判断是不是一个表示Range的字符串
 * @param sep 
 */
export function isRangeStr(sep: string): boolean {
    const test1 = /^\[?[\u4E00-\u9FA5A-Za-z0-9_]*\]?\!\$?[a-zA-Z]+\$?\d+(\:\$?[a-zA-Z]+\$?\d+)?$/.test(sep);
    const test2 = /^\$?[a-zA-Z]+\$?\d+(\:\$?[a-zA-Z]+\$?\d+)?$/.test(sep);
    return test1 || test2;
}

