import { ICell } from "../../../core/base/cell";


const state = {
  activeRibbionTab: "home",
  enabled: true,
  selection: ['A1', 'A1'],
  focusedCellID: 'A1',
  tempFocusedCellContent: '',
  leftTopCellID: 'A1',
  shouldUpdate: true,
  zoom: 1
}


export type TViewState = typeof state

export default state;