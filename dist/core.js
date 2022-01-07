"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("base/ioHandler", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("base/resource", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("base/floatObject", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FloatObjectType = void 0;
    var FloatObjectType;
    (function (FloatObjectType) {
        FloatObjectType["Picture"] = "pic";
        FloatObjectType["Video"] = "video";
        FloatObjectType["Chart"] = "chart";
    })(FloatObjectType = exports.FloatObjectType || (exports.FloatObjectType = {}));
});
define("base/reference", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RefType = void 0;
    var RefType;
    (function (RefType) {
        RefType[RefType["SheetRef"] = 0] = "SheetRef";
        RefType[RefType["CellRef"] = 1] = "CellRef";
        RefType[RefType["FloatObjectRef"] = 2] = "FloatObjectRef";
        RefType[RefType["ResourceRef"] = 3] = "ResourceRef";
        RefType[RefType["OtherRef"] = 4] = "OtherRef";
    })(RefType = exports.RefType || (exports.RefType = {}));
});
define("base/cell", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CellType = void 0;
    var CellType;
    (function (CellType) {
        CellType["NumberCell"] = "number";
        CellType["TextCell"] = "text";
        CellType["RichTextCell"] = "html";
    })(CellType = exports.CellType || (exports.CellType = {}));
});
define("base/range", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("base/printOption", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PageOrientation = void 0;
    var PageOrientation;
    (function (PageOrientation) {
        PageOrientation[PageOrientation["Portrait"] = 0] = "Portrait";
        PageOrientation[PageOrientation["Landscape"] = 1] = "Landscape";
    })(PageOrientation = exports.PageOrientation || (exports.PageOrientation = {}));
    ;
});
define("base/sheet", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("base/book", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BookState = exports.BookType = void 0;
    var BookType;
    (function (BookType) {
        BookType["ZXBOOK"] = "zxs";
        BookType["XLSBOOK"] = "xls";
        BookType["XLSXBOOK"] = "xlsx";
    })(BookType = exports.BookType || (exports.BookType = {}));
    var BookState;
    (function (BookState) {
        BookState[BookState["CLOSED"] = 0] = "CLOSED";
        BookState[BookState["OPENED"] = 1] = "OPENED";
        BookState[BookState["EDITED"] = 2] = "EDITED";
    })(BookState = exports.BookState || (exports.BookState = {}));
});
define("formula/error", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParseError = exports.ParseErrorType = void 0;
    var ParseErrorType;
    (function (ParseErrorType) {
        ParseErrorType["SyntaxError"] = "SyntaxError";
        ParseErrorType["IllegalCharacterError"] = "IllegalCharacterError";
    })(ParseErrorType = exports.ParseErrorType || (exports.ParseErrorType = {}));
    var ParseError = /** @class */ (function (_super) {
        __extends(ParseError, _super);
        function ParseError(type, message, position) {
            if (message === void 0) { message = ""; }
            if (position === void 0) { position = -1; }
            var _this = _super.call(this, (message !== null && message !== void 0 ? message : type.toString()) + (position == -1 ? "" : "at char index ".concat(position))) || this;
            _this.type = type;
            _this.position = position;
            return _this;
        }
        return ParseError;
    }(Error));
    exports.ParseError = ParseError;
});
define("formula/number", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.strToNumber = void 0;
    function strToNumber(str) {
        return {
            value: parseFloat(str),
            exp: 0
        };
    }
    exports.strToNumber = strToNumber;
});
define("sheet/range", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isRangeStr = exports.Range = void 0;
    var Range = /** @class */ (function () {
        function Range(desc) {
            this.desc = desc;
        }
        Range.prototype.getAllCells = function () {
            throw new Error("Method not implemented.");
        };
        return Range;
    }());
    exports.Range = Range;
    /**
     * 判断是不是一个表示Range的字符串
     * @param sep
     */
    function isRangeStr(sep) {
        var test1 = /^\[?[\u4E00-\u9FA5A-Za-z0-9_]*\]?\!\$?[a-zA-Z]+\$?\d+(\:\$?[a-zA-Z]+\$?\d+)?$/.test(sep);
        var test2 = /^\$?[a-zA-Z]+\$?\d+(\:\$?[a-zA-Z]+\$?\d+)?$/.test(sep);
        return test1 || test2;
    }
    exports.isRangeStr = isRangeStr;
});
define("formula/parser", ["require", "exports", "sheet/range", "formula/error", "formula/number", "formula/operatorUtils"], function (require, exports, range_1, error_1, number_1, operatorUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseFormula = exports.FormulaTreeResultType = void 0;
    var FormulaTreeResultType;
    (function (FormulaTreeResultType) {
        FormulaTreeResultType["Value"] = "value";
        FormulaTreeResultType["IRange"] = "ref";
        FormulaTreeResultType["Array"] = "array";
    })(FormulaTreeResultType = exports.FormulaTreeResultType || (exports.FormulaTreeResultType = {}));
    // 入栈优先度  留栈优先度
    var operatorPriority = {
        '<': [0, 0],
        '>': [0, 0],
        '<=': [0, 0],
        '>=': [0, 0],
        '+': [5, 5],
        '-': [5, 5],
        '*': [10, 10],
        '/': [10, 10],
        '^': [15, 15],
        '%': [20, 20],
        '(': [150, -2],
        'function': [150, -2],
        ')': [-1, -1]
    };
    var functionStartSep = ' ';
    var FormulaParser = /** @class */ (function () {
        function FormulaParser(content) {
            /**
             * 当前处理的字符串分段
             */
            this.sep = "";
            /**
             * 当前处理状态
             * - 0 表示空闲
             * - 1 表示单词序列
             * - 2 表示数字序列
             * - 3 强制字符串模式
             * - 4 数组输入模式
             */
            this.mode = 0;
            this.arrayForInput = [];
            /**
             * 符号栈，用于处理符号和函数
             */
            this.stack = [];
            /**
             * 当前输出的元素
             */
            this.items = [];
            this.content = content;
        }
        FormulaParser.prototype.popOperator = function () {
            var popOp = this.stack.pop();
            if (!popOp)
                throw new error_1.ParseError(error_1.ParseErrorType.SyntaxError);
            var node = {
                functionName: popOp,
                values: [],
                returnType: (0, operatorUtils_1.getOperatorReturnType)(popOp)
            };
            var cmpOp;
            if (operatorPriority.hasOwnProperty(popOp))
                cmpOp = popOp;
            else
                cmpOp = "function";
            var p;
            if (cmpOp != 'function') {
                var num = popOp == '%' ? 1 : 2;
                while (num--) {
                    p = this.items.pop();
                    if (!p || this.items.length == 0)
                        throw new error_1.ParseError(error_1.ParseErrorType.SyntaxError);
                    node.values.push(p);
                }
            }
            else {
                while ((p = this.items.pop()) != functionStartSep) {
                    if (!p || this.items.length == 0)
                        throw new error_1.ParseError(error_1.ParseErrorType.SyntaxError);
                    node.values.push(p);
                }
            }
            this.items.push(node);
        };
        FormulaParser.prototype.meetOperator = function (op) {
            var cmpOp;
            if (operatorPriority.hasOwnProperty(op))
                cmpOp = op;
            else
                cmpOp = "function";
            while (operatorPriority[this.stack.top][1] > operatorPriority[cmpOp][0]) {
                this.popOperator();
            }
            if (op == ')') {
                if (this.stack.top != '(')
                    throw new error_1.ParseError(error_1.ParseErrorType.SyntaxError, "Unpaired brackets");
                this.stack.pop();
            }
            else
                this.stack.push(op);
        };
        FormulaParser.prototype.split = function () {
            for (var i = 0; i < this.content.length; i++) {
                var char = this.content[i];
                var isSpace = (char == ' ');
                var isLetter = /^[\u4E00-\u9FA5A-Za-z_]$/.test(char);
                var isNumberOrPointOrE = /^[1-9eE\.]$/.test(char);
                var isSign = /^\"\'\+\-\*\/\&\^\(\)\$\%\=\>\<\!\[\]\!\{\}\:$/.test(char);
                var isRangeSign = /^\[\]\!\$\:\$/.test(char);
                var isStrSign = /^\"\'$/.test(char);
                var isComputeSign = /^\+\-\*\/\&\^\%\=$/.test(char);
                var isComputeSignWithAmbiguity = /^\>\<$/.test(char);
                var isComma = (char == ',');
                var isLeftBigBrackets = (char == '{');
                var isRightBigBrackets = (char == '}');
                // 如果字符不合法
                if (this.mode != 3 && !isSpace && !isLetter && !isNumberOrPointOrE && !isSign)
                    throw new error_1.ParseError(error_1.ParseErrorType.IllegalCharacterError);
                if (isSpace && this.mode != 3)
                    continue;
                if (this.mode == 0) {
                    this.sep = char;
                    if (isLetter)
                        this.mode = 1;
                    //这里不可能是e，因为上面已经过滤了字母
                    else if (isNumberOrPointOrE)
                        this.mode = 2;
                    else if (isStrSign) {
                        //进入字符串强制模式
                        this.stack.push(char);
                        this.sep = "";
                        this.mode = 3;
                    }
                    else if (isComputeSign) {
                        this.meetOperator(char);
                    }
                    else if (isComputeSignWithAmbiguity) {
                        if (this.content[i + 1] == '=') {
                            i++;
                            this.meetOperator(char + '=');
                        }
                        else {
                            this.meetOperator(char);
                        }
                    }
                    else if (isLeftBigBrackets) {
                        this.arrayForInput = [];
                        this.sep = "";
                        this.mode = 4;
                    }
                    else {
                        throw new error_1.ParseError(error_1.ParseErrorType.SyntaxError);
                    }
                }
                else if (this.mode == 1) {
                    if (isSign) {
                        if (char == '(') {
                            if (!isLegalFunctionName(this.sep))
                                throw new error_1.ParseError(error_1.ParseErrorType.SyntaxError);
                            this.stack.push(this.sep);
                            this.items.push(functionStartSep);
                        }
                        else if (isRangeSign) {
                            this.sep += char;
                        }
                        else {
                            if (!(0, range_1.isRangeStr)(this.sep))
                                throw new error_1.ParseError(error_1.ParseErrorType.SyntaxError, "Invalid Range String ".concat(this.sep, "."), i);
                            this.items.push(new range_1.Range(this.sep));
                            //finish and back
                            if (!isComma)
                                i--;
                            this.mode = 0;
                            this.sep = "";
                        }
                    }
                    else
                        this.sep += char;
                }
                else if (this.mode == 2) {
                    if (isNumberOrPointOrE) {
                        if (this.sep.indexOf('.') != -1 && char == '.')
                            throw new error_1.ParseError(error_1.ParseErrorType.SyntaxError, "more than one point in a number");
                        if (this.sep.indexOf('e') != -1 && char == 'e')
                            throw new error_1.ParseError(error_1.ParseErrorType.SyntaxError, "more than one sign \"e\" in a number");
                        if (this.sep.indexOf('E') != -1 && char == 'E')
                            throw new error_1.ParseError(error_1.ParseErrorType.SyntaxError, "more than one sign \"e\" in a number");
                        this.sep += char;
                    }
                    else if (isLetter) {
                        throw new error_1.ParseError(error_1.ParseErrorType.SyntaxError, "a letter is followed by a number, which lead to ambiguilty");
                    }
                    else {
                        this.items.push((0, number_1.strToNumber)(this.sep));
                        if (!isComma)
                            i--;
                        this.mode = 0;
                        this.sep = "";
                    }
                }
                else if (this.mode == 3) {
                    if ((this.stack.top == '"' &&
                        char == '"' && i + 1 < this.content.length && this.content[i + 1] != '"') ||
                        (this.stack.top == "'" &&
                            char == "'" && i + 1 < this.content.length && this.content[i + 1] != "'")) {
                        this.stack.pop();
                        this.items.push(this.sep);
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
                        this.arrayForInput.push((0, number_1.strToNumber)(this.sep));
                        this.mode = 0;
                        this.sep = "";
                        this.items.push(this.arrayForInput);
                        this.arrayForInput = [];
                    }
                    else if (isNumberOrPointOrE) {
                        if (this.sep.indexOf('.') != -1 && char == '.')
                            throw new error_1.ParseError(error_1.ParseErrorType.SyntaxError, "more than one point in a number");
                        if (this.sep.indexOf('e') != -1 && char == 'e')
                            throw new error_1.ParseError(error_1.ParseErrorType.SyntaxError, "more than one sign \"e\" in a number");
                        if (this.sep.indexOf('E') != -1 && char == 'E')
                            throw new error_1.ParseError(error_1.ParseErrorType.SyntaxError, "more than one sign \"e\" in a number");
                        this.sep += char;
                    }
                    else if (isLetter) {
                        throw new error_1.ParseError(error_1.ParseErrorType.SyntaxError, "a letter is followed by a number, which lead to ambiguilty");
                    }
                    else if (isComma) {
                        this.arrayForInput.push((0, number_1.strToNumber)(this.sep));
                        this.sep = "";
                    }
                    else {
                        throw new error_1.ParseError(error_1.ParseErrorType.SyntaxError);
                    }
                }
            }
        };
        FormulaParser.prototype.handleRemainedOperators = function () {
            while (this.stack.length != 0) {
                this.popOperator();
            }
        };
        FormulaParser.prototype.parse = function () {
            this.split();
            if (this.stack.length != 0)
                this.handleRemainedOperators();
            if (this.items.length != 1)
                throw new error_1.ParseError(error_1.ParseErrorType.SyntaxError);
            return this.items[0];
        };
        return FormulaParser;
    }());
    function isLegalFunctionName(name) {
        return /^[\u4E00-\u9FA5A-Za-z_][\u4E00-\u9FA5A-Za-z0-9_]*$/.test(name);
    }
    /**
     * 解析一个公式，生成表达式树
     * @param content 公式，不包含开头的等于号
     * @returns 返回一个表达式树，或一个值单元
     * @throws `ParseError` 解析错误返回异常
     */
    function parseFormula(content) {
        return new FormulaParser(content).parse();
    }
    exports.parseFormula = parseFormula;
});
define("formula/operatorUtils", ["require", "exports", "formula/parser"], function (require, exports, parser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getOperatorReturnType = void 0;
    function getOperatorReturnType(op) {
        // TODO implements it
        return parser_1.FormulaTreeResultType.Value;
    }
    exports.getOperatorReturnType = getOperatorReturnType;
});
/**
 * 给数组加入一些关于栈的方法和属性
 */
Object.defineProperty(Array.prototype, "top", {
    get: function () {
        return (this.at(this.length - 1));
    }
});
