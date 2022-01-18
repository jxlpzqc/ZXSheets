import { IRange } from "../range";

export enum PageOrientation {
    Portrait,
    Landscape
}

export interface Header {
    left: string;
    center: string;
    right: string;
};

export interface HeaderOption {
    header: Header;
    footer: Header;
}

export interface PageSizeOption {
    /**
     * 纸张类型名称，比如 A4, Letter
     */
    name: string;
    /**
     * 纸张宽度，单位厘米，宽度为短边
     */
    width: number;
    /**
     * 纸张高度，单位厘米，高度为长边
     */
    height: number;
}

/**
 * 页边距配置
 */
export interface MarginOption {
    left: number;
    top: number;
    right: number;
    bottom: number;
    header: number;
    footer: number;
    /**
     * 页边距设置为水平居中，若该值为true，left和right失效
     */
    centerHorizentally: boolean;
    /**
     * 页边距设置为垂直居中，若该值为true，top和bottom失效
     */
    centerVertically: boolean;

}

export interface PageSettings {
    orientation: PageOrientation;
    margins: MarginOption;
    pageSize: PageSizeOption;
    firstPageNumber: number | "auto",

}

export interface PrintScaleOption {
    widthPages: number | "auto";
    heightPages: number | "auto";
    /**
     * 百分比缩放值，当widthPages和heightPages都为auto时生效，最大值为100，最小值为1
     */
    percentageScale: number;
}

export interface PrintOption {
    page: PageSettings;
    headerAndFooter: HeaderOption;
    printScale: PrintScaleOption;
    
    printArea: IRange | undefined;
    printTiles: {
        rows: IRange | undefined,
        columns: IRange | undefined
    } | undefined;
    cellErrorsDisplay: "displayed" | "blank" | string;
    /**
     * 打印顺序  
     * down 先从上到下  
     * over 先从左到右  
     */
    pageOrderFirst: "down" | "over";
}