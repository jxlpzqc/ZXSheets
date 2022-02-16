import { ICell } from "../../../core/base/cell";


const state = {
  activeRibbionTab: "home",
  enabled: true,
  selection: ['A1', 'A1'],
  focusedCellID: 'A1',
  focusedCellContent: '',
  leftTopCellID: 'A1',
  shouldUpdate: true
}


export type TViewState = typeof state

export default state;