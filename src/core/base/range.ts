import { ICell } from "./cell";

export interface IRange {
    /**
     * Range 描述符  
     * 例如  
     * - A1
     * - A:C
     * - A1:B3
     * - A1:B3,O11
     * - $A$1
     * - Sheet1!A1:B3
     */
    desc: string;
    getAllCells(): ICell[];
}