import { ICell } from "../../../core/base/cell";

export type TViewState = {
  activeRibbionTab: string;
  enabled: boolean;
  selectedSheetID?: number;
  selection?: {
    start: string;
    end: string;
  },
  focusedCellID?: string;
  focusedCell?: ICell;
};

const state: TViewState = {
  activeRibbionTab: "home",
  enabled: true
}

export default state;