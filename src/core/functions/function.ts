export type FunctionType = 'number' | 'text' | 'bool' | 'aray' | 'object' | 'ref' | 'varargs';

export interface IFunction {
    name: string;
    returnType: FunctionType;
    argsType: FunctionType[];
    fun: (...args: any) => any;
}