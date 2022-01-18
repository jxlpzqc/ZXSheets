import { Font } from "./font";
import { FormatInfo } from "./formatInfo";

export interface Style {
    backgroundColor: string;
    foregroundColor: string;
    font: Font;
    format: FormatInfo;
}