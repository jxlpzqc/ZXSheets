import { Font } from "../base/defs/font";
import { PageOrientation, PrintOption } from "../base/defs/printOption";
import { Style } from "../base/defs/style";


// TODO: Delete this file

const dPrintOptions: PrintOption = {
    page: {
        orientation: PageOrientation.Portrait,
        margins: {
            left: 10,
            top: 10,
            right: 10,
            bottom: 10,
            header: 10,
            footer: 10,
            centerHorizentally: false,
            centerVertically: false
        },
        pageSize: {
            name: "A4",
            width: 210,
            height: 297
        },
        firstPageNumber: "auto",
    },
    headerAndFooter: {
        header: {
            left: "",
            center: '',
            right: ''
        },
        footer: {
            left: "",
            center: '',
            right: ''
        },
    },
    printScale: {
        widthPages: 1,
        heightPages: 1,
        percentageScale: 1
    },
    printArea: undefined,
    printTiles: undefined,
    cellErrorsDisplay: "displayed",
    pageOrderFirst: "down"
};

const dFont: Font = {
    fontFamily: "SimSun",
    fontStyle: "normal",
    fontSize: 18,
    underline: "none"
};



const dStyle: Style = {
    backgroundColor: "transparent",
    foregroundColor: "#ffffff",
    font: dFont,
    format: {
        formatStr: ''
    }
};

export const Defaults = {
    rowHeight: 30,
    columnWidth: 80,
    printOptions: dPrintOptions,
    style: dStyle,
    maxRows: 1048576,
    maxColumns: 16384
};