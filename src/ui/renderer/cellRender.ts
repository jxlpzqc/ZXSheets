import { ICell } from "../../core/base/cell";

export interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
}

export function renderCell(context: CanvasRenderingContext2D, cell: ICell, rect: Rect, renderRect: Rect) {
    context.clearRect(renderRect.x, renderRect.y, renderRect.w, renderRect.h);
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    if (rect.x != renderRect.x || rect.y != renderRect.y) {
        canvas = document.createElement("canvas");
        ctx = canvas.getContext("2d")!;
    }
    else {
        ctx = context;
    }

    ctx.fillStyle = '#000';
    // console.log(1);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(cell.value, rect.x, rect.y + rect.h / 2);




}