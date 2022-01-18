import { IRange, isRange } from "../base/range";
import { ISheet } from "../base/sheet";
import { isNumber, Real } from "../formula/number";
import { FormulaTreeNode, FormulaTreeResult } from "../formula/parser";
import { isFormulaTreeNode, isFormulaValue } from "../formula/utils";
import { GetFunction } from "./caller";

export function computeFormula(formula: FormulaTreeResult): any {
    console.log("1");
    
    if (isFormulaValue(formula) || formula instanceof Array) return formula;
    else if (isRange(formula)) return formula;
    else if (isFormulaTreeNode(formula)) {
        let f = formula as FormulaTreeNode;
        // 递归调用
        let values = f.values.map(u => computeFormula(u));
        let fun = GetFunction(f.functionName, ...values);
        if (!fun) throw new Error("Function not found!");
        // 对参数进行处理
        let args = [];
        for (let i = fun.argsType.length - 1; i >= 0; i--) {
            if (fun.argsType[i] == 'varargs') {
                let j = values.length;
                while (j >= fun.argsType.length) {
                    args.push(values[j]);
                    j--;
                }
            }
            else if (fun.argsType[i] != 'ref' && isRange(values[i])) {
                let r = values[i] as IRange;
                let cells = r.getAllCells();
                if (fun.argsType[i] == 'array_n') {
                    let arg = [];
                    for (const cell of cells) {
                        if (isNumber(cell.value)) arg.push(cell.value);
                    }
                    args.push(arg);
                }
                else if (fun.argsType[i] == 'array_s') {
                    let arg = [];
                    for (const cell of cells) {
                        if (isNumber(cell.value)) arg.push((cell.value as Real).toString());
                        else if (typeof (cell.value) == 'string') arg.push(cell.value);
                    }
                    args.push(arg);
                }
                else if (fun.argsType[i] == 'bool') {
                    if (cells.length > 0) {
                        let firstCell = cells[0];
                        if (isNumber(firstCell.value) || typeof (firstCell.value) == 'boolean') {
                            args.push(!!firstCell.value);
                        } else {
                            args.push(true);
                        }
                    }
                }
                else if (fun.argsType[i] == 'number') {
                    if (cells.length > 0) {
                        let firstCell = cells[0];
                        if (isNumber(firstCell.value)) {
                            args.push(firstCell.value);
                        } else {
                            args.push(0);
                        }
                    }
                }
                else if (fun.argsType[i] == 'text') {
                    if (cells.length > 0) {
                        let firstCell = cells[0];
                        if (isNumber(firstCell.value)) {
                            args.push((<Real>(firstCell.value)).toString());
                        } else {
                            args.push('');
                        }
                    }
                }
                else {
                    args.push(undefined);
                }
            }
            else {
                args.push(values[i]);
            }

        }
        return fun.fun(...args);
    }
}