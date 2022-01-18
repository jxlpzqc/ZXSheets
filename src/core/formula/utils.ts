import { GetFunction } from "../functions/caller";
import { FunctionType } from "../functions/function";
import { isNumber } from "./number";


export function getOperatorReturnType(op: string, args: any[]): FunctionType | undefined {
    return GetFunction(op, args)?.returnType;
}


export function isFormulaTreeNode(obj: any) {
    return ('functionName' in obj && 'values' in obj && 'returnType' in obj);
}

export function isFormulaValue(obj: any) {
    return isNumber(obj) || typeof (obj) == 'string';
}