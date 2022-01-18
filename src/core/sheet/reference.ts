import { ICell } from "../base/cell";
import { ICellReference, RefType } from "../base/reference";
import { ISheet } from "../base/sheet";

export class CellReference implements ICellReference {
    getCellName(): string {
        throw new Error("Method not implemented.");
    }
    getCell(): ICell {
        throw new Error("Method not implemented.");
    }
    getSheetName(): string {
        throw new Error("Method not implemented.");
    }
    getSheet(): ISheet {
        throw new Error("Method not implemented.");
    }
    constructor(
        public objID: string,
        public type: RefType) {

    }

}