import { FunctionType, IFunction } from "./function";

export class FunctionContainer {

    private functions = new Map<string, IFunction[]>();

    public Regist(fun: IFunction) {
        if (!checkFunctionValidity(fun))
            throw new Error("Regist Fail: Invalid function.");

        let set: IFunction[];
        if (!this.functions.has(fun.name)) {
            set = [];
            this.functions.set(fun.name, set);
        }
        else {
            set = this.functions.get(fun.name)!;
        }
        addFunInSet(set, fun);
    }

    public GetFunctionAsInstance<T extends IFunction>(functionName: string, ...args: FunctionType[]): T | undefined {
        return this.GetFunction(functionName, ...args) as T | undefined;
    }

    public GetFunction(functionName: string, ...args: string[]): IFunction | undefined {
        const items = this.functions.get(functionName);
        if (!items) return undefined;
        for (const item of items) {
            let match = true;
            for (let i = 0; i < args.length; i++) {
                const requiredArgTypes = args[i];
                if (item.argsType[i] == 'varargs') break;
                else if (requiredArgTypes == 'any') continue;
                else if (!requiredArgTypes.split(',').includes(item.argsType[i])) {
                    match = false;
                    break;
                }
            }
            if (match) {
                return item;
            }

            // if (item.argsType.toString() == args.toString()) {
            //     return item;
            // }
            // else if (item.argsType.length > 0 &&
            //     item.argsType[item.argsType.length - 1] == 'varargs' &&
            //     args.length >= item.argsType.length - 1 &&
            //     item.argsType.slice(0, item.argsType.length - 1).toString() == args.slice(0, item.argsType.length - 1).toString()) {
            //     return item; ``
            // }
        }
        return undefined;
    }

    private constructor() { }

    static _instance: FunctionContainer | null = null;

    static getInstance(): FunctionContainer {
        if (!this._instance) {
            this._instance = new FunctionContainer();
        }
        return this._instance;
    }

}

function checkFunctionValidity(fun: IFunction): boolean {
    if (!isLegalFunctionName(fun.name)) return false;
    if (fun.argsType.length) {
        for (let i = 0; i < fun.argsType.length - 1; i++) {
            const arg = fun.argsType[i];
            if (arg == 'varargs') return false;
        }
    }
    return true;
}

/**
 * 判断是否是合法函数名
 * @param name 函数名
 * @returns 
 */
function isLegalFunctionName(name: string) {
    return /^[\u4E00-\u9FA5A-Za-z_][\u4E00-\u9FA5A-Za-z0-9_]*$/.test(name);
}

/**
 * 根据函数重载时匹配顺序插入一个函数
 * @param set 
 * @param fun 
 */
function addFunInSet(set: IFunction[], fun: IFunction) {
    for (let index = 0; index < set.length; index++) {
        const element = set[index];
        const cmpResult = compareFunPriority(fun, element);
        if (cmpResult == 0)
            throw new Error("Already contains a function which has same name and argument list.")
        if (cmpResult < 0) {
            set.splice(index, 0, fun);
            return;
        }
    }
    set.push(fun);
}

const argPriority = ['number', 'bool', 'array_n', 'text', 'array_s', 'object', 'ref', 'varargs'];

function compareFunPriority(fun1: IFunction, fun2: IFunction): number {
    if (fun1.argsType.length < fun2.argsType.length) return -1;
    else if (fun1.argsType.length > fun2.argsType.length) return 1;

    for (let i = 0; i < fun1.argsType.length; i++) {
        const fun1Arg = fun1.argsType[i];
        const fun2Arg = fun2.argsType[i];
        if (argPriority.indexOf(fun1Arg) < argPriority.indexOf(fun2Arg)) {
            return -1;
        }
        else {
            return 1;
        }
    }
    return 0;
}

export function GetFunctionContainer(): FunctionContainer {
    return FunctionContainer.getInstance();
}