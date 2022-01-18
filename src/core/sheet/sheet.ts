import { ICell } from "../base/cell";
import { IFloatObject } from "../base/floatObject";
import { PageOrientation, PrintOption } from "../base/defs/printOption";
import { ISheet } from "../base/sheet";
import { Cell } from "./cell";
import { RangeDef } from "../base/defs/rangedef";
import { RowDef } from "../base/defs/rowdef";
import { Style } from "../base/defs/style";
import { Defaults } from "../global/defaults";
import { indexLetterToNumber } from "./utils";

export class Sheet implements ISheet {
    getColumnWidth(index: number): number {
        for (const c of this.columns) {
            if (c.selection.start <= index && c.selection.end >= index) {
                return c.length;
            }
        }
        return this.defaultColumnWidth;
    }
    getRowHeight(index: number): number {
        for (const r of this.rows) {
            if (r.selection.start <= index && r.selection.end >= index) {
                return r.length;
            }
        }
        return this.defaultRowHeight;
    }

    rows: RowDef[] = [];
    defaultRowHeight: number = Defaults.rowHeight;
    columns: RowDef[] = [];
    defaultColumnWidth: number = Defaults.columnWidth;
    defaultCellStyle = Defaults.style;
    setRangeStyle(): void {
        throw new Error("Method not implemented.");
    }
    getRangeStyles(): RangeDef[] {
        throw new Error("Method not implemented.");
    }
    //TODO 改成使用红黑树实现
    private cells: ICell[] = [];

    editCell(index: string, content: string): void {
        let c = this.cells.find(u => u.id == index);
        if (!c) {
            c = new Cell(index);
        }
        c.content = content;
    }

    deleteCell(index: string): void {
        let c = this.cells.findIndex(u => u.id == index);
        if (c != -1) this.cells.splice(c, 1);
    }
    getCellsInRect(a: string, b: string): ICell[] {

        throw new Error("Method not implemented.");

    }
    getCell(index: string): ICell | undefined {
        return this.cells.find(u => u.id == index);
    }
    getAllCells(): { index: string; cell: ICell; }[] {
        return this.cells.map(u => ({
            index: u.id,
            cell: u
        }));
    }
    getFloatObject(index: number): IFloatObject | undefined {
        throw new Error("Method not implemented.");
    }
    getAllFloatObjects(): IFloatObject[] {
        throw new Error("Method not implemented.");
    }
    printOption: PrintOption = Defaults.printOptions

}