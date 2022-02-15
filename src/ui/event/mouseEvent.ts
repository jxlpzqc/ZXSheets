import SheetView from "..";
import { Defaults } from "../../core/global/defaults";
import { exactIndex, indexLetterToNumber, indexNumberToLetter, isALeftTopOfB } from "../../core/sheet/utils";
import { MouseEventArgs } from "./event";

let mousedown = false;
let sType: 'none' | 'cell' | 'row' | 'column' | 'all' = 'none';

function changeSelection(view: SheetView, selection: string[]) {
    view.selection = selection;
    if (view.onFoucusedChange) view.onFoucusedChange(view.focusedCell);
    if (view.onSelectionChange) view.onSelectionChange(view.selection);
}

export function handleMouseDown(e: MouseEventArgs) {
    mousedown = true;
    const { view } = e;
    if (view.enabled) {
        if (e.item.type == 'all') {
            changeSelection(view, ['A1', indexNumberToLetter(Defaults.maxColumns) + Defaults.maxRows]);
            sType = 'all';
        }
        else if (e.item.type == 'row') {
            changeSelection(view, ['A' + e.item.desc!, indexNumberToLetter(Defaults.maxColumns) + e.item.desc!]);
            sType = 'row';
        }
        else if (e.item.type == 'column') {
            changeSelection(view, [e.item.desc! + '1', e.item.desc! + Defaults.maxRows]);
            sType = 'column';
        }
        else if (e.item.type == 'cell') {
            changeSelection(view, [e.item.desc!, e.item.desc!]);
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
            changeSelection(view, [
                indexNumberToLetter(Math.min(index1[0], index2[0])) + Math.min(index1[1], index2[1]),
                indexNumberToLetter(Math.max(index1[0], index2[0])) + Math.max(index1[1], index2[1]),
            ]);
        }
        else if (sType == 'all') { }
        else if (sType == 'column') {
            // hit test
            const desc = view.PositionToObj(e.x, 0).desc!;

            if (indexLetterToNumber(desc!) >= exactIndex(view.focusedCell)[0]) {
                changeSelection(view, [view.focusedCell, desc! + Defaults.maxRows]);
            }
            else {
                changeSelection(view, [desc! + '1', indexNumberToLetter(exactIndex(view.focusedCell)[0]) + Defaults.maxRows]);

            }

        }
        else if (sType == 'row') {
            // hit test
            const desc = view.PositionToObj(0, e.y).desc!;

            if (parseInt(desc!) >= exactIndex(view.focusedCell)[1]) {
                changeSelection(view, [view.focusedCell, indexNumberToLetter(Defaults.maxColumns) + desc!]);
            }
            else {
                changeSelection(view, ['A' + desc, indexNumberToLetter(Defaults.maxColumns) + (exactIndex(view.focusedCell)[1])]);

            }
        }

    }
}

export function handleMouseup(e: MouseEventArgs) {
    mousedown = false;
}