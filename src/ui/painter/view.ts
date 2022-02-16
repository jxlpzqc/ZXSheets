import { ISheet } from "../../core/base/sheet";
import { arrToIndexStr, cmpIndex, CmpIndexResult, exactIndex, indexLetterToNumber, indexNumberToLetter, isALeftTopOfB } from "../../core/sheet/utils";
import { handleMouseDown, handleMouseMove, handleMouseup } from "../event/mouseEvent";
import { Rect, renderCell } from "../renderer/cellRender";

export interface SheetViewObj {
    type: 'cell' | 'fillPoint' | 'column' | 'row' | 'columnResizer' | 'rowResizer' | 'all',
    desc?: string;
    obj?: any;
}


let drawOffset1 = 0;
const drawOffset2 = 0;
const o1 = (v: number) => (v + drawOffset1);
const o2 = (v: number) => (v + drawOffset2);


const headingH = 20;
const headingW = 50;

export class SheetView {

    private block: HTMLElement;
    private mainCanvas!: HTMLCanvasElement;
    private assistanceCanvas!: HTMLCanvasElement;

    private tWidth!: number;
    private tHeight!: number;

    private _sheet: ISheet;
    public get sheet(): ISheet {
        return this._sheet;
    }
    public set sheet(value: ISheet) {
        this._sheet = value;
        this.draw();
    }

    public enabled = true;

    private _startCellIndex: number[] = [1, 1];
    private get _endCellIndex(): number[] {
        return [
            this._startCellIndex[0] + this.columnsXs.length - 2,
            this._startCellIndex[0] + this.rowYs.length - 2
        ]
    }

    public get startCellIndex(): string {
        return (indexNumberToLetter(this._startCellIndex[0]) + this._startCellIndex[1].toString());
    }
    public set startCellIndex(value: string) {
        if (!/^([a-zA-Z]+)(\d+)$/.test(value))
            throw new Error("Not a index!");
        this._startCellIndex = exactIndex(value);
        this.draw();
    }

    private _offsetLeft: number = 0;
    public get offsetLeft(): number {
        return this._offsetLeft;
    }
    public set offsetLeft(value: number) {
        this._offsetLeft = value;
        this.draw();
    }

    private _offsetTop: number = 0;
    public get offsetTop(): number {
        return this._offsetTop;
    }
    public set offsetTop(value: number) {
        this._offsetTop = value;
        this.draw();
    }

    private _scale: number = 1;
    public get scale(): number {
        return this._scale;
    }
    public set scale(value: number) {
        this._scale = value;
        this.draw();
    }

    private getScaleFunction(): (value: number) => number {
        return (value) => value * this._scale;
    }

    private _showHeading: boolean = true;
    public get showHeading(): boolean {
        return this._showHeading;
    }
    public set showHeading(value: boolean) {
        this._showHeading = value;
        this.draw();
    }


    private _showGirdline: boolean = true;
    public get showGirdline(): boolean {
        return this._showGirdline;
    }
    public set showGirdline(value: boolean) {
        this._showGirdline = value;
        this.draw();
    }

    private _selection = [1, 1, 1, 1];

    private get selectionStartStr() {
        return indexNumberToLetter(this._selection[0]) + this._selection[1].toString();
    }

    private get selectionEndStr() {
        return indexNumberToLetter(this._selection[2]) + this._selection[3].toString();
    }

    public get selection() {
        return [
            this.selectionStartStr,
            this.selectionEndStr
        ];
    }

    public set selection(value: string[]) {
        // TODO: 支持多选区
        if (isALeftTopOfB(value[0], value[1])) {
            this._selection =
                exactIndex(value[0])
                    .concat(exactIndex(value[1]));;
        }
        else {
            throw new Error("The start is not left top of the end.");
        }

        if ((this._focusedCell[0] != this._selection[0] && this._focusedCell[0] != this._selection[2]) ||
            (this._focusedCell[1] != this._selection[1] && this._focusedCell[1] != this._selection[3])) {
            this._focusedCell = this._selection.slice(0, 2);
        }

        this.drawSelection();
    }

    private _focusedCell: number[] = [1, 1];

    public get focusedCell() {
        return indexNumberToLetter(this._focusedCell[0]) + this._focusedCell[1].toString();
    }

    public set focusedCell(value: string) {
        this._focusedCell = exactIndex(value);
        this.drawSelection();
    }

    public onFoucusedChange?: (value: string) => void;
    public onSelectionChange?: (value: string[]) => void;

    constructor(element: string | HTMLElement, sheet: ISheet) {
        this._sheet = sheet;

        let ele: HTMLElement | null;

        if (typeof (element) == 'string')
            ele = document.getElementById(element);
        else
            ele = element;

        if (!!ele) this.block = ele;
        else throw new Error("Could not find such a element.");

        // add event listener
        const resizeObserver = new ResizeObserver(entries => {
            this.setViewport();
            this.draw();
        });
        resizeObserver.observe(ele);

        const s = this.getScaleFunction();

        ele.addEventListener('mousedown', (e) => {
            const obj = this.PositionToObj(s(e.offsetX), s(e.offsetY));
            handleMouseDown({
                view: this,
                item: obj,
                x: s(e.offsetX),
                y: s(e.offsetY),
                e
            });
        });

        ele.addEventListener('mousemove', (e) => {
            const obj = this.PositionToObj(s(e.offsetX), s(e.offsetY));
            handleMouseMove({
                view: this,
                item: obj,
                x: s(e.offsetX),
                y: s(e.offsetY),
                e
            });
        });

        ele.addEventListener('mouseup', (e) => {
            const obj = this.PositionToObj(s(e.offsetX), s(e.offsetY));
            handleMouseup({
                view: this,
                item: obj,
                x: s(e.offsetX),
                y: s(e.offsetY),
                e
            });
        });

        this.initializeCanvas();

    }

    public PositionToObj(x: number, y: number): SheetViewObj {

        const fillPointRecOffset = 8;

        if (this._showHeading) {
            if (x <= headingW && y <= headingH) {
                return {
                    type: 'all'
                }
            }
            else if (x <= headingW) {
                return {
                    type: 'row',
                    desc: (this._startCellIndex[1] + (this.rowYs.findIndex(u => u >= y)) - 1).toString()
                }
            }
            else if (y <= headingH) {
                return {
                    type: 'column',
                    desc: indexNumberToLetter(this._startCellIndex[0] + (this.columnsXs.findIndex(u => u >= x)) - 1)
                }
            }
        }


        if (x >= this.fillPointPos[0] - fillPointRecOffset && x <= this.fillPointPos[0] + fillPointRecOffset
            && y >= this.fillPointPos[1] - fillPointRecOffset && y <= this.fillPointPos[1] + fillPointRecOffset)
            return {
                type: 'fillPoint'
            };



        const i1 = this._startCellIndex[0] + (this.columnsXs.findIndex(u => u > x) - 1);
        const i2 = this._startCellIndex[1] + Math.max(0, (this.rowYs.findIndex(u => u > y)) - 1);

        return {
            type: 'cell',
            desc: indexNumberToLetter(i1) + i2,
            obj: [i1, i2]
        }
    }

    private setViewport() {

        // 解决高dpi问题
        const dpi = window.devicePixelRatio || 1;

        this.tWidth = this.block.clientWidth * dpi;
        this.tHeight = this.block.clientHeight * dpi;

        this.mainCanvas.width = this.tWidth;
        this.mainCanvas.height = this.tHeight;
        this.mainCanvas.style.width = this.block.clientWidth + 'px';
        this.mainCanvas.style.height = this.block.clientHeight + 'px';
        this.assistanceCanvas.width = this.tWidth;
        this.assistanceCanvas.height = this.tHeight;
        this.assistanceCanvas.style.width = this.block.clientWidth + 'px';
        this.assistanceCanvas.style.height = this.block.clientHeight + 'px';
    }

    private initializeCanvas() {
        // 解决高dpi问题
        const dpi = window.devicePixelRatio || 1;
        this._scale = dpi;

        this.mainCanvas = document.createElement("canvas");
        this.assistanceCanvas = document.createElement("canvas");
        this.mainCanvas.style.position = 'absolute';
        this.assistanceCanvas.style.position = 'absolute';

        this.setViewport();
        this.block.appendChild(this.mainCanvas);
        this.block.appendChild(this.assistanceCanvas);
    }

    public draw() {
        this.clearMainCanvas();
        this.drawHeadingsAndLines();
        this.drawCells();
        this.drawSelection();
    }

    public drawSelectionLayer() {
        this.drawSelection();
    }

    private fillPointPos: number[] = [-100, -100];

    private drawSelection() {
        this.clearAssistanceCanvas();

        let s1: number, s2: number, e1: number, e2: number;
        let index: number;

        // 确定左上角坐标
        index = this._selection[0] - this._startCellIndex[0];
        if (index >= this.columnsXs.length) return;
        else if (index < 0) s1 = 0;
        else s1 = this.columnsXs[index];

        index = this._selection[1] - this._startCellIndex[1];
        if (index >= this.rowYs.length) return;
        else if (index < 0) s2 = 0;
        else s2 = this.rowYs[index];

        // 确定右下角坐标
        index = this._selection[2] - this._startCellIndex[0] + 1;
        if (index >= this.columnsXs.length) e1 = this.tWidth;
        else e1 = this.columnsXs[index];

        index = this._selection[3] - this._startCellIndex[1] + 1;
        if (index >= this.rowYs.length) e2 = this.tHeight;
        else e2 = this.rowYs[index];

        const ctx = this.assistanceCanvas.getContext('2d')!;
        ctx.fillStyle = "#55555555";
        ctx.fillRect(s1, s2, e1 - s1, e2 - s2);
        ctx.strokeStyle = "#196F3D";
        ctx.lineWidth = 2;
        ctx.strokeRect(s1, s2, e1 - s1, e2 - s2);
        this.fillPointPos = [e1, e2];

        if (this._showHeading) {
            ctx.fillStyle = '#006b3c33';
            const s = this.getScaleFunction();
            ctx.fillRect(s1, 0, e1 - s1, s(headingH));
            ctx.fillRect(0, s2, s(headingW), e2 - s2);
            ctx.fillStyle = "#196F3D";
            ctx.fillRect(s1, s(headingH) - 2, e1 - s1, 2);
            ctx.fillRect(s(headingW) - 2, s2, 2, e2 - s2);

        }


        // 确定左上角坐标
        index = this._focusedCell[0] - this._startCellIndex[0];
        if (index >= this.columnsXs.length) return;
        else if (index < 0) s1 = 0;
        else s1 = this.columnsXs[index];

        index = this._focusedCell[1] - this._startCellIndex[1];
        if (index >= this.rowYs.length) return;
        else if (index < 0) s2 = 0;
        else s2 = this.rowYs[index];

        // 确定右下角坐标
        index = this._focusedCell[0] - this._startCellIndex[0] + 1;
        if (index >= this.columnsXs.length) e1 = this.tWidth;
        else e1 = this.columnsXs[index];

        index = this._focusedCell[1] - this._startCellIndex[1] + 1;
        if (index >= this.rowYs.length) e2 = this.tHeight;
        else e2 = this.rowYs[index];


        ctx.clearRect(s1 + 2, s2 + 2, e1 - s1 - 3, e2 - s2 - 4);

        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.fillRect(this.fillPointPos[0] - 4, this.fillPointPos[1] - 4, 8, 8);
        ctx.strokeRect(this.fillPointPos[0] - 4, this.fillPointPos[1] - 4, 8, 8);


    }
    private drawCells() {
        const cells = this.sheet.getCellsInRect(arrToIndexStr(this._startCellIndex), arrToIndexStr(this._endCellIndex));
        const ctx = this.mainCanvas.getContext("2d")!;

        for (const cell of cells) {
            const i = exactIndex(cell.id);
            const rect: Rect = {
                x: this.columnsXs[i[0] - this._startCellIndex[0]] + 2,
                y: this.rowYs[i[1] - this._startCellIndex[1]] + 2,
                w: this.columnsXs[i[0] - this._startCellIndex[0] + 1] - this.columnsXs[i[0] - this._startCellIndex[0]] - 4,
                h: this.rowYs[i[1] - this._startCellIndex[1] + 1] - this.rowYs[i[1] - this._startCellIndex[1]] - 4
            }

            renderCell(ctx, cell, rect, rect);
        }
    }

    private columnsXs: number[] = [];
    private rowYs: number[] = [];

    private clearMainCanvas() {
        this.mainCanvas.getContext('2d')!.clearRect(0, 0, this.tWidth, this.tHeight);
    }

    private clearAssistanceCanvas() {
        this.assistanceCanvas.getContext('2d')!.clearRect(0, 0, this.tWidth, this.tHeight);
    }

    private drawHeadingsAndLines() {
        const ctx = this.mainCanvas.getContext('2d')!;
        const s = this.getScaleFunction();
        const glH = this._showGirdline ? this.tHeight : s(headingH);
        const glW = this._showGirdline ? this.tWidth : s(headingW);
        this.columnsXs = [];
        this.rowYs = [];

        if (this._showHeading) {

            ctx.fillStyle = "#DDD";
            ctx.fillRect(0, 0, this.tWidth, s(headingH));
            ctx.fillRect(0, 0, s(headingW), this.tHeight);

            ctx.fillStyle = "#888";
            ctx.fillRect(s(headingW), 0, 1, this.tHeight);
            ctx.fillRect(0, s(headingH), this.tWidth, 1);

            drawOffset1 = (-this.offsetLeft + headingW);
            let currentX = s(o1(0));
            let currentC = this._startCellIndex[0];
            while (currentX <= this.tWidth) {
                this.columnsXs.push(currentX);
                const w = this.sheet.getColumnWidth(currentC);
                currentX += s(w / 2);
                ctx.fillStyle = "#000";
                ctx.font = `${s(12)}px sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(indexNumberToLetter(currentC), currentX, s(headingH / 2));
                currentX += s(w / 2);
                // Gridline
                ctx.fillStyle = "#BBB";
                ctx.fillRect(currentX, 0, 1, glH);
                currentC++;
            }
            this.columnsXs.push(currentX);

            drawOffset1 = (-this.offsetTop + headingH);
            let currentY = s(o1(0));
            let currentR = this._startCellIndex[1];
            while (currentY <= this.tHeight) {
                this.rowYs.push(currentY);
                const h = this.sheet.getRowHeight(currentR);
                currentY += s(h / 2);
                ctx.fillStyle = "#000";
                ctx.font = `${s(12)}px sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(currentR.toString(), s(headingW / 2), currentY);
                currentY += s(h / 2);
                // Gridline
                ctx.fillStyle = "#BBB";
                ctx.fillRect(0, currentY, glW, 1);
                currentR++;
            }
            this.rowYs.push(currentY);
        }

    }


}