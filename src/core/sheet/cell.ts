import BigNumber from "bignumber.js";
import { CellType, ICell } from "../base/cell";
import { Style } from "../base/defs/style";
import { ICellReference } from "../base/reference";
import { FormulaTreeNode, FormulaTreeResult, parseFormula } from "../formula/parser";
import { computeFormula } from "../functions/compute";

export class Cell implements ICell {

    constructor(public id: string) { }
    style = undefined;

    type: CellType = CellType.NormalCell;
    private _content: string = "";
    set content(value: string) {
        let oldValue = this._content;
        this._content = value;
        this.updateValue(oldValue);
    }
    get content() {
        return this._content;
    }

    private _value: any;
    get value() {
        return this._value;
    }
    influencedCell = undefined;
    enableEdit = true;

    private formulaInfo = {
        formula: '',
        result: undefined as FormulaTreeResult | undefined
    };

    public updateValue(oldContent: string) {
        if (this.type != CellType.NormalCell)
            this._value = this._content;
        else if (this._content.startsWith('\'')) {
            this._value = this._content.substring(1, this._content.length - 1);
        }
        else if (this._content.startsWith('=')) 
        {
            let formula = this._content.substring(1, this._content.length);
            if (this.formulaInfo.formula != formula) {
                try {
                    this.formulaInfo.result = parseFormula(formula);
                }
                catch (e) {
                    // implements logger
                    console.error(e);
                    this._value = "#PARSE_ERR"
                }
            }
            this._value = computeFormula(this.formulaInfo.result!);
        }
        else {
            const l = new BigNumber(this._content);
            if (l.isNaN()) {
                this._value = this._content;
            } else {
                this._value = l;
            }

        }

    }
}

