import { ICellReference } from "./reference";

export enum CellType {
    NumberCell = "number",
    TextCell = "text",
    RichTextCell = "html"
}

export interface ICell {
    /**
     * Cell的ID，例如A1，AF1024
     */
    id: string;
    type: CellType;
    content: string;
    value: string;
    influencedCell: ICellReference;
    enableEdit: boolean;
}