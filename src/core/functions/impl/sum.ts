import BigNumber from "../../../../node_modules/bignumber.js/bignumber";
import { IRange, isRange } from "../../base/range";
import { isNumber, Real } from "../../formula/number";
import { SheetFunction } from "../decorators";
import { FunctionType, IFunction } from "../function";
import { mathAdd } from "./operators";

@SheetFunction()
class SumFunction implements IFunction {
    name: string = 'sum';
    returnType: FunctionType = 'number';
    argsType: FunctionType[] = ['varargs'];
    fun(...args: any): Real {
        let sum = new BigNumber(0);
        for (const item of args) {
            if (isRange(item)) {
                let r = item as IRange;
                for (const cell of r.getAllCells()) {
                    if (isNumber(cell.value)) {
                        sum = mathAdd(sum, cell.value);
                    }
                }
            }
            else if (isNumber(item)) {
                sum = mathAdd(sum, item);
            }
            else if (item instanceof Array) {
                for (const i of item) {
                    sum = mathAdd(sum, i);
                }
            }

        }
        return sum;
    }
}

export default [SumFunction]