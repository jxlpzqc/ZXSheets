import { IRange } from "../base/range";
import { FunctionType } from "../functions/function";
import { Range, isRangeStr } from "../sheet/range";
import { ParseError, ParseErrorType } from "./error";
import { Real, strToNumber } from "./number";
import { getOperatorReturnType } from "./utils";

// Stack Defs
/**
 * 给数组加入一些关于栈的方法和属性
 */
Object.defineProperty(Array.prototype, "top", {
    get() {
        //@ts-ignore
        return (this[this.length - 1]);
    }
})

declare global {
    interface Array<T> {
        top: T;
    }
}


/**
 * 可处理的最基本的数值单元
 */
type Value = Real | string;

export interface FormulaTreeNode {
    functionName: string;
    values: FormulaTreeResult[];
    returnType: FunctionType | 'uncertain';
}

export type FormulaTreeResult = FormulaTreeNode | Value | IRange | Value[];

// 入栈优先度  留栈优先度
const operatorPriority: { [key: string]: number[] } = {
    '&': [1, 1],
    '<': [3, 3],
    '>': [3, 3],
    '<=': [3, 3],
    '>=': [3, 3],
    '+': [5, 5],
    '-': [5, 5],
    '*': [10, 10],
    '/': [10, 10],
    '^': [15, 15],
    '%': [20, 20],
    '(': [150, -2],
    'function': [150, -2],
    ',': [0, 0],
    ')': [-1, -1]
};

const functionStartSep = ' ';

class FormulaParser {
    /**
     * 当前处理的字符串分段
     */
    private sep = "";

    /**
     * 当前处理状态  
     * - 0 表示空闲
     * - 1 表示单词序列
     * - 2 表示数字序列
     * - 3 强制字符串模式
     * - 4 数组输入模式
     */
    private mode = 0;

    private arrayForInput: Real[] = [];

    /**
     * 符号栈，用于处理符号和函数
     */
    private stack: string[] = [];

    /**
     * 当前输出的元素
     */
    private items: (FormulaTreeResult | IRange)[] = [];

    /**
     * 需要处理的字符串，来自于用户输入
     */
    private content: string;

    constructor(content: string) {
        this.content = content;
    }

    private popOperator() {
        const popOp = this.stack.pop();
        if (!popOp)
            throw new ParseError(ParseErrorType.SyntaxError);
        const node: FormulaTreeNode = {
            functionName: popOp,
            values: [],
            returnType: 'uncertain'
        }

        let cmpOp: string;
        if (operatorPriority.hasOwnProperty(popOp))
            cmpOp = popOp;
        else
            cmpOp = "function";

        let p: FormulaTreeResult | undefined;
        if (cmpOp != 'function') {
            let num = popOp == '%' ? 1 : 2;
            while (num--) {
                p = this.items.pop()
                if (!p)
                    throw new ParseError(ParseErrorType.SyntaxError);
                node.values.push(p);
            }
        }
        else {
            while ((p = this.items.pop()) != functionStartSep) {
                if (!p)
                    throw new ParseError(ParseErrorType.SyntaxError);
                node.values.push(p);
            }
        }
        // -- 解析时不需要确定类型
        // let rType = getOperatorReturnType(node.functionName, node.values);
        // if (!rType) {
        //     throw new ParseError(ParseErrorType.FunctionNotFound, -1,
        //         `function which name is ${node.functionName} and args is ${node.values.toString()} is not found.`)
        // } 
        // node.returnType = rType;
        this.items.push(node);
    }

    private meetOperator(op: string) {
        let cmpOp: string, stackTopCmpOp: string;
        if (operatorPriority.hasOwnProperty(op))
            cmpOp = op;
        else
            cmpOp = "function";


        if (this.stack.length > 0) {

            while (true) {
                if (operatorPriority.hasOwnProperty(this.stack.top))
                    stackTopCmpOp = this.stack.top;
                else
                    stackTopCmpOp = "function";

                if (operatorPriority[stackTopCmpOp][1] < operatorPriority[cmpOp][0]) break;

                this.popOperator();
            }
        }

        if (op == ')') {
            const nOp = this.stack.top;
            if (!nOp || (nOp != '(' && operatorPriority.hasOwnProperty(nOp)))
                throw new ParseError(ParseErrorType.SyntaxError, -1, "Unpaired brackets");

            if (!operatorPriority.hasOwnProperty(nOp)) {
                this.popOperator();
            }
            else {
                this.stack.pop();
            }

        }
        else if (op == ',') {
            // 不做任何处理
        }
        else this.stack.push(op);
    }

    split() {
        for (let i = 0; i < this.content.length; i++) {

            const char = this.content[i];
            const isSpace = (char == ' ');
            const isLetter = /^[\u4E00-\u9FA5A-Za-z_]$/.test(char);
            const isNumberOrPointOrE = /^[0-9eE\.]$/.test(char);
            const isSign = /^[\"\'\+\-\*\/\&\^\(\)\$\%\=\>\<\!\[\]\!\{\}\:\,]$/.test(char);
            const isRangeSign = /^[\[\]\!\$\:]$/.test(char);
            const isStrSign = /^[\"\']$/.test(char);
            const isComputeSign = /^[\+\-\*\/\&\^\%\=\(\)]$/.test(char);
            const isComputeSignWithAmbiguity = /^[\>\<]$/.test(char);
            const isComma = (char == ',');
            const isLeftBigBrackets = (char == '{');
            const isRightBigBrackets = (char == '}');
            const isEndOfStr = (i == this.content.length - 1);

            // 如果字符不合法
            if (this.mode != 3 && !isSpace && !isLetter && !isNumberOrPointOrE && !isSign)
                throw new ParseError(ParseErrorType.IllegalCharacterError, i);

            if (isSpace && this.mode != 3) continue;

            if (this.mode == 0) {
                this.sep = char;
                if (isLetter) this.mode = 1;
                //这里不可能是e，因为上面已经过滤了字母
                else if (isNumberOrPointOrE) this.mode = 2;
                else if (isStrSign) {
                    //进入字符串强制模式
                    this.stack.push(char);
                    this.sep = "";
                    this.mode = 3;
                }
                else if (isComputeSign) {
                    this.sep = "";
                    this.meetOperator(char);
                }
                else if (isComputeSignWithAmbiguity) {
                    this.sep = "";
                    if (i + 1 < this.content.length && this.content[i + 1] == '=') {
                        i++;
                        this.meetOperator(char + '=');
                    } else {
                        this.meetOperator(char);
                    }
                }
                else if (isLeftBigBrackets) {
                    this.arrayForInput = [];
                    this.sep = "";
                    this.mode = 4;
                }
                else if (isComma) {
                    this.sep == "";
                    this.meetOperator(char);
                }
                else {
                    throw new ParseError(ParseErrorType.SyntaxError, i);
                }
            }
            else if (this.mode == 1) {
                if (isSign) {
                    if (char == '(') {
                        if (!isLegalFunctionName(this.sep))
                            throw new ParseError(ParseErrorType.SyntaxError, i);
                        this.stack.push(this.sep);
                        this.items.push(functionStartSep);
                        this.sep = "";
                    }
                    else if (isRangeSign) {
                        this.sep += char;
                    }
                    else {
                        if (!isRangeStr(this.sep))
                            throw new ParseError(ParseErrorType.SyntaxError, i, `Invalid Range String ${this.sep}.`)
                        this.items.push(new Range(this.sep));
                        //finish and back
                        i--;
                        this.mode = 0;
                        this.sep = "";
                    }
                }
                else this.sep += char;
            }
            else if (this.mode == 2) {
                if (isNumberOrPointOrE) {
                    if (this.sep.indexOf('.') != -1 && char == '.')
                        throw new ParseError(ParseErrorType.SyntaxError, i, "more than one point in a number");
                    if (this.sep.indexOf('e') != -1 && char == 'e')
                        throw new ParseError(ParseErrorType.SyntaxError, i, "more than one sign \"e\" in a number");
                    if (this.sep.indexOf('E') != -1 && char == 'E')
                        throw new ParseError(ParseErrorType.SyntaxError, i, "more than one sign \"e\" in a number");
                    this.sep += char;
                }
                else if (isLetter) {
                    throw new ParseError(ParseErrorType.SyntaxError, i, "a letter is followed by a number, which lead to ambiguilty");
                }
                else {
                    this.items.push(strToNumber(this.sep));
                    i--;
                    this.mode = 0;
                    this.sep = "";
                }
            }
            else if (this.mode == 3) {
                if ((this.stack.top == '"' &&
                    char == '"' && i + 1 < this.content.length && this.content[i + 1] != '"') ||
                    (this.stack.top == "'" &&
                        char == "'" && i + 1 < this.content.length && this.content[i + 1] != "'") ||
                    (isEndOfStr && char == this.stack.top)) {

                    this.stack.pop();
                    this.items.push(this.sep);
                    this.sep = "";
                    this.mode = 0;
                }
                else if ((this.stack.top == '"' &&
                    char == '"' && i + 1 < this.content.length && this.content[i + 1] == '"')) {
                    this.sep += '"';
                    i++;
                }
                else if (this.stack.top == "'" &&
                    char == "'" && i + 1 < this.content.length && this.content[i + 1] == "'") {
                    this.sep += "'";
                    i++;
                }
                else {
                    this.sep += char;
                }
            }
            else if (this.mode == 4) {
                if (isRightBigBrackets) {
                    this.arrayForInput.push(strToNumber(this.sep));
                    this.mode = 0;
                    this.sep = "";
                    this.items.push(this.arrayForInput);
                    this.arrayForInput = [];
                }
                else if (isNumberOrPointOrE) {
                    if (this.sep.indexOf('.') != -1 && char == '.')
                        throw new ParseError(ParseErrorType.SyntaxError, i, "more than one point in a number");
                    if (this.sep.indexOf('e') != -1 && char == 'e')
                        throw new ParseError(ParseErrorType.SyntaxError, i, "more than one sign \"e\" in a number");
                    if (this.sep.indexOf('E') != -1 && char == 'E')
                        throw new ParseError(ParseErrorType.SyntaxError, i, "more than one sign \"e\" in a number");
                    this.sep += char;
                }
                else if (isLetter) {
                    throw new ParseError(ParseErrorType.SyntaxError, i, "a letter is followed by a number, which lead to ambiguilty");
                }
                else if (isComma) {
                    this.arrayForInput.push(strToNumber(this.sep));
                    this.sep = "";
                }
                else {
                    throw new ParseError(ParseErrorType.SyntaxError);
                }
            }
        }
        if (this.sep != '' && this.mode == 1) {
            if (!isRangeStr(this.sep))
                throw new ParseError(ParseErrorType.SyntaxError, this.content.length - 1, `Invalid Range String ${this.sep}.`)
            this.items.push(new Range(this.sep));
        }
        else if (this.sep != '') this.items.push(this.sep);
    }

    handleRemainedOperators() {
        while (this.stack.length != 0) {
            this.popOperator();
        }
    }

    public parse(): FormulaTreeResult {
        this.split();
        if (this.stack.length != 0) this.handleRemainedOperators();
        if (this.items.length != 1) throw new ParseError(ParseErrorType.SyntaxError);
        return this.items[0];
    }
}

function isLegalFunctionName(name: string) {
    return /^[\u4E00-\u9FA5A-Za-z_][\u4E00-\u9FA5A-Za-z0-9_]*$/.test(name);
}

/**
 * 解析一个公式，生成表达式树
 * @param content 公式，不包含开头的等于号
 * @returns 返回一个表达式树，或一个值单元 
 * @throws `ParseError` 解析错误返回异常
 */
export function parseFormula(content: string): FormulaTreeResult {
    return new FormulaParser(content).parse();
}

