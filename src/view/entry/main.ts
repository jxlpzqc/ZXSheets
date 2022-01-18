import { Context } from "../../core/global/context";
import { Sheet } from "../../core/sheet/sheet";
import { SheetView } from "../../ui/painter/view";

const sheet = new Sheet();
Context.sheet = sheet;
sheet.editCell("A1","1");
sheet.editCell("A2","1");
sheet.editCell("A3","=A1+A2");
const painter = new SheetView('main', sheet);
painter.draw();

