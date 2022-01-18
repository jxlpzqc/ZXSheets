import { ICell } from "./cell";
import { IFloatObject } from "./floatObject";
import { PrintOption } from "./defs/printOption";
import { RowDef } from "./defs/rowdef";
import { Style } from "./defs/style";
import { RangeDef } from "./defs/rangedef";

export interface ISheet {
    getCell(index: string): ICell | undefined;
    editCell(index: string, content: string): void;
    deleteCell(index: string): void;
    getCellsInRect(a: string, b: string): ICell[];

    getAllCells(): {
        index: string,
        cell: ICell
    }[];
    getFloatObject(index: number): IFloatObject | undefined;
    getAllFloatObjects(): IFloatObject[];
    printOption: PrintOption;

    rows: RowDef[];
    defaultRowHeight: number;

    columns: RowDef[];
    defaultColumnWidth: number;

    defaultCellStyle: Style;

    getColumnWidth(index: number): number;
    getRowHeight(index: number): number;

    setRangeStyle(): void;
    getRangeStyles(): RangeDef[];
}
