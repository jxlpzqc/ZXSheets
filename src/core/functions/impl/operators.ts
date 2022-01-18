import { Real } from "../../formula/number";
import { SheetFunction } from "../decorators";
import { FunctionType, IFunction } from "../function";

export function mathAdd(a: Real, b: Real): Real {
    return a.plus(b);
}

export function mathMinus(a: Real, b: Real): Real {
    return a.minus(b);
}

export function mathTimes(a: Real, b: Real): Real {
    return a.multipliedBy(b);
}

export function mathDividedby(a: Real, b: Real): Real {
    return a.dividedBy(b);
}

export function mathPower(a: Real, b: Real): Real {
    return a.pow(b);
}

@SheetFunction()
class AddFunction implements IFunction {
    name: string = '+';
    returnType: FunctionType = 'number';
    argsType: FunctionType[] = ['number', 'number'];
    fun = mathAdd;
}

@SheetFunction()
class ConcatFunction implements IFunction {
    name: string = '+';
    returnType: FunctionType = 'text';
    argsType: FunctionType[] = ['text', 'text'];
    fun(a: string, b: string): string {
        return a + b;
    }
}

@SheetFunction()
class ConcatFunction2 implements IFunction {
    name: string = '&';
    returnType: FunctionType = 'text';
    argsType: FunctionType[] = ['text', 'text'];
    fun(a: string, b: string): string {
        return a + b;
    }
}

@SheetFunction()
class MinusFunction implements IFunction {
    name: string = '-';
    returnType: FunctionType = 'number';
    argsType: FunctionType[] = ['number', 'number'];
    fun = mathMinus;
}


@SheetFunction()
class TimesFunction implements IFunction {
    name: string = '*';
    returnType: FunctionType = 'number';
    argsType: FunctionType[] = ['number', 'number'];
    fun = mathTimes;
}


@SheetFunction()
class DivideFunction implements IFunction {
    name: string = '/';
    returnType: FunctionType = 'number';
    argsType: FunctionType[] = ['number', 'number'];
    fun = mathDividedby;
}

@SheetFunction()
class PowerFunction implements IFunction {
    name: string = '^';
    returnType: FunctionType = 'number';
    argsType: FunctionType[] = ['number', 'number'];
    fun = mathPower;
}
