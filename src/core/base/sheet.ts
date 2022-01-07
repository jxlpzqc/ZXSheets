import { ICell } from "./cell";
import { IFloatObject } from "./floatObject";
import { PrintOption } from "./printOption";

export interface ISheet {
    getCell(index: string): ICell | null;
    getAllCells(): {
        index: string,
        cell: ICell
    }[];
    getFloatObject(index: number): IFloatObject | null;
    getAllFloatObjects(): IFloatObject[];
    printOption: PrintOption;
}
