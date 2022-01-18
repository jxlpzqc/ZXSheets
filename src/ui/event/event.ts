import { SheetView, SheetViewObj } from "../painter/view";

export interface EventArgs {
    view: SheetView;
    item: SheetViewObj;
    attachment?: any;
}


export interface MouseEventArgs extends EventArgs {
    x: number;
    y: number;
}