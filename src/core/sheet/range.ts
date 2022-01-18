import { ICell } from "../base/cell";
import { IRange } from "../base/range";
import { Context } from "../global/context";


const singleCellRe = /^\$?([a-zA-Z]+)\$?(\d+)$/;
const rectCellRe = /^\$?([a-zA-Z]+)\$?(\d+)\:\$?([a-zA-Z]+)\$?(\d+)$/;


export class Range implements IRange {
    getAllCells(): ICell[] {
        let result = singleCellRe.exec(this.desc);
        if (!!result) {
            if (!Context.sheet)
                throw new Error("No selected sheet!");
            else {
                const l = Context.sheet.getCell(result[1] + result[2]);
                if (!!l) return [l];
                else return [];
            }
        }

        result = rectCellRe.exec(this.desc);
        if (!!result) {
            if (!Context.sheet)
                throw new Error("No selected sheet!");
            else {
                return Context.sheet.getCellsInRect(result[1] + result[2], result[3] + result[4]);
            }
        }

        //TODO: 完成对其他 sheet 引用


        return [];

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

