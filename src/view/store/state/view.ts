import { ICell } from "../../../core/base/cell";


const state = {
  activeRibbionTab: "home",
  enabled: true,
  selection: {
    start: 'A1',
    end: 'A1'
  },
  focusedCellID: 'A1',
  focusedCellContent:''
}


export type TViewState = typeof state

export default state;