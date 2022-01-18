import { IRange, isRange } from "../base/range";
import { isNumber } from "../formula/number";
import { GetFunctionContainer } from "./container";
import { IFunction } from "./function";

export function GetFunction(functionName: string, ...args: any[]): IFunction | undefined {
    let types: string[] = [];
    for (const arg of args) {
        if (isRange(arg)) {
            let range = arg as IRange;
            let cells = range.getAllCells();
            if (cells.length == 0) {
                types.push('any');
            }
            else if (cells.length == 1) {
                let cell = cells[0];
                if (isNumber(cell.value)) {
                    types.push('number,string,ref');
                }
                else {
                    types.push('string,ref');
                }
            }
            else {
                let isN = true;
                for (const cell of cells) {
                    if (isNumber(cell.value)) {
                        isN = false;
                        break;
                    }
                }
                types.push(isN ? 'array_n,array_s,ref' : 'array_s,ref');
            }
        }
        else if (isNumber(arg)) {
            types.push('number,string');
        }
        else if (typeof (arg) == 'string') {
            types.push('string');
        }
        else if (arg instanceof Array) {
            types.push('array_n');
        }
        else {
            throw new Error(`Unsupported Type at arg: ` + arg);
        }
    }
    return GetFunctionContainer().GetFunction(functionName, ...args);

}