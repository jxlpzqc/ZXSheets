import { FunctionContainer, GetFunctionContainer } from "./container";
import { FunctionType, IFunction } from "./function";

// 声明重载函数
export function SheetFunction(functionName: string, argsType: FunctionType[], returnType: FunctionType): ClassDecorator;
export function SheetFunction(argsType: FunctionType[], returnType: FunctionType): ClassDecorator;
export function SheetFunction(): ClassDecorator;


export function SheetFunction(a?: any, b?: any, c?: any): ClassDecorator {

    return (constructor: Function) => {
        // @ts-ignore
        const cls = new constructor();
        let clsName = constructor.name;

        if ('name' in cls && 'returnType' in cls && 'argsType' in cls && 'fun' in cls) {
            const fun = cls as IFunction;

            if (!a && !b && !c) {
                fun.name = fun.name.toLowerCase();
            }
            else if (a instanceof Array && typeof (b) == 'string' && !c) {
                if (clsName.endsWith("Function")) {
                    clsName = clsName.substring(0, clsName.indexOf("Function"));
                }
                else {
                    throw new Error("This class is not named as a function");
                }
                fun.name = clsName.toLowerCase();
                fun.argsType = a;
                fun.returnType = b as FunctionType;
            }
            else if (typeof (a) == 'string' && b instanceof Array && typeof (c) == 'string') {
                fun.name = a.toLowerCase();
                fun.argsType = b;
                fun.returnType = c as FunctionType;
            }
            else {
                throw new Error("Bad arguments.");
            }


            GetFunctionContainer().Regist(fun);
        }
        else {
            throw new Error("This class is not a function!");
        }
    };
}