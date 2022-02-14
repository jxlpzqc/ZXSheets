import { Style } from "./defs/style";
import { ICellReference } from "./reference";

export enum CellType {
    NormalCell = "number",
    TextCell = "text",
    RichTextCell = "html"
}

export interface ICell {
    /**
     * Cell的ID，例如A1，AF1024
     */
    id: string;
    type: CellType;
    /**
     * 用户输入的值
     */
    content: string;
    /**
     * 计算出来的值
     */
    value: any;
    influencedCell?: ICellReference;
    enableEdit: boolean;
    style?: Style;
}