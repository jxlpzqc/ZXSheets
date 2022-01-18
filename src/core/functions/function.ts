export type FunctionType = 'number' | 'text' | 'bool' | 'array_n' | 'array_s' | 'object' | 'ref' | 'varargs';

export interface IFunction {
    name: string;
    returnType: FunctionType;
    argsType: FunctionType[];
    fun: (...args: any) => any;
}