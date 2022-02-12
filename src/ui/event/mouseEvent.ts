import { Defaults } from "../../core/global/defaults";
import { exactIndex, indexLetterToNumber, indexNumberToLetter, isALeftTopOfB } from "../../core/sheet/utils";
import { MouseEventArgs } from "./event";

let mousedown = false;
let sType: 'none' | 'cell' | 'row' | 'column' | 'all' = 'none';

export function handleMouseDown(e: MouseEventArgs) {
    mousedown = true;
    const { view } = e;
    if (view.enabled) {
        if (e.item.type == 'all') {
            view.selection = ['A1', indexNumberToLetter(Defaults.maxColumns) + Defaults.maxRows];
            sType = 'all';
        }
        else if (e.item.type == 'row') {
            view.selection = ['A' + e.item.desc!, indexNumberToLetter(Defaults.maxColumns) + e.item.desc!];
            sType = 'row';
        }
        else if (e.item.type == 'column') {
            view.selection = [e.item.desc! + '1', e.item.desc! + Defaults.maxRows];
            sType = 'column';
        }
        else if (e.item.type == 'cell') {
            view.selection = [e.item.desc!, e.item.desc!];
            sType = 'cell';
        }
    }
}

export function handleMouseMove(e: MouseEventArgs) {
    const { view } = e;

    if (mousedown && (e.e as MouseEvent).buttons == 1) {
        if (sType == 'cell' && e.item.type == 'cell') {
            const index1 = exactIndex(view.focusedCell);
            const index2 = exactIndex(e.item.desc!);
            view.selection = [
                indexNumberToLetter(Math.min(index1[0], index2[0])) + Math.min(index1[1], index2[1]),
                indexNumberToLetter(Math.max(index1[0], index2[0])) + Math.max(index1[1], index2[1]),
            ]
        }
        else if (sType == 'all') { }
        else if (sType == 'column') {
            // hit test
            const desc = view.PositionToObj(e.x, 0).desc!;

            if (indexLetterToNumber(desc!) >= exactIndex(view.focusedCell)[0]) {
                view.selection = [view.focusedCell, desc! + Defaults.maxRows];
            }
            else {
                view.selection = [desc! + '1', indexNumberToLetter(exactIndex(view.focusedCell)[0]) + Defaults.maxRows];

            }

        }
        else if (sType == 'row') {
            // hit test
            const desc = view.PositionToObj(0, e.y).desc!;

            if (parseInt(desc!) >= exactIndex(view.focusedCell)[1]) {
                view.selection = [view.focusedCell, indexNumberToLetter(Defaults.maxColumns) + desc!];
            }
            else {
                view.selection = ['A' + desc, indexNumberToLetter(Defaults.maxColumns) + (exactIndex(view.focusedCell)[1])];

            }
        }

    }
}

export function handleMouseup(e: MouseEventArgs) {
    mousedown = false;
}