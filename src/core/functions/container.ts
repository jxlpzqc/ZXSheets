import { IFunction } from "./function";

export class FunctionContainer {

    private functions = new Map<string, IFunction[]>();

    public Regist(fun: IFunction) {
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

    private constructor() { }

    static _instance: FunctionContainer | null = null;

    static getInstance(): FunctionContainer {
        if (!this._instance) {
            this._instance = new FunctionContainer();
        }
        return this._instance;
    }

}

function addFunInSet(set: IFunction[], fun: IFunction) {
    for (let index = 0; index < set.length; index++) {
        const element = set[index];
        if (compareFunPriority(fun, element) < 0) {

        }

    }

}
function compareFunPriority(fun: IFunction, element: IFunction): number {
    if (fun.argsType.length < element.argsType.length) return -1;
    else if (fun.argsType.length > element.argsType.length) return 1;
    
}

