export interface RibbonPalette {
    main: string;
    inActiveTab: string;
    tabBody: string;
    backStageButton: string;
    backStageText: string;
    backStageButton: string;
    activeBackStageButton: string;
}
export const MainRibbon: React.FC<{
    text?: string,
    currentTab?: number,
    font?: string,
    enabled?: boolean,
    palette?: RibbonPalette,
    fileButtonEvents?: any,
    tabEvents?: any,
    quickAccessButtons?: any
}>
export const RibbonTabPage: (prop: any) => React.ReactElement;
export const RibbonGroup: (prop: any) => React.ReactElement;
export const RibbonColumn: (prop: any) => React.ReactElement;
export const RibbonRow: (prop: any) => React.ReactElement;
export const Separator: (prop: any) => React.ReactElement;
export const DropDownWithSmallImageWithText: (prop: any) => React.ReactElement;
export const DropDownWithLargeImageWithText: (prop: any) => React.ReactElement;
export const ButtonWithSmallImageWithText: (prop: any) => React.ReactElement;
export const ButtonWithLargeImageWithText: (prop: any) => React.ReactElement;
export const ButtonWithSmallImage: (prop: any) => React.ReactElement;
export const SplitButton: (prop: any) => React.ReactElement;
export const SplitButtonWithSmallImage: (prop: any) => React.ReactElement;
export const PopupMenu: (prop: any) => React.ReactElement;
export const MenuItem: (prop: any) => React.ReactElement;
export const ComboBox: (prop: any) => React.ReactElement;
export const MenuDropDown: (prop: any) => React.ReactElement;
export const MenuSeparator: (prop: any) => React.ReactElement;
export const DropDownWithSmallImage: (prop: any) => React.ReactElement;
export const Checkbox: (prop: any) => React.ReactElement;
