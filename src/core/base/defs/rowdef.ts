import { Style } from "./style";

export interface RowDef {
    selection: {
        start: number;
        end: number;
    };
    style: Style;
    /**
     * 长度，描述行时表示高度，描述列时表示宽度
     */
    length: number;
}

export type ColumnDef = RowDef;