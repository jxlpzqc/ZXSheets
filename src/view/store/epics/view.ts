import { AnyAction } from "redux";
import {
  Observable, mergeMap, mergeMapTo, race, of, mapTo, switchMap, merge, from, take, map
} from 'rxjs';
import { ofType, StateObservable } from "redux-observable";
import { RootState } from "../state";
import Actions, { ActionTypes } from "../actions";
import { ISheet } from "@/core/base/sheet";

async function submitChange(sheet: ISheet | undefined, cellID: string, value: string) {
  if (!!sheet) {
    // TODO: Use worker to update.
    sheet.editCell(cellID, value);
  }
}

function getCellValue(sheet: ISheet | undefined, cellID: string): string {
  return sheet?.getCell(cellID)?.content ?? "";
}

// Epics
function submitCellChangeEpic(action$: Observable<AnyAction>, store$: StateObservable<RootState>) {
  return action$.pipe(
    ofType(ActionTypes.view.submitContentChange),
    mergeMap(u => merge(
      from([
        Actions.status.__changeStatus({
          desc: '正在计算受影响的单元格',
          progress: 'indeterminate'
        }),
        Actions.view.changeEnabled(false)
      ]),
      from(
        submitChange(store$.value.file.currentSheet,
          store$.value.view.focusedCellID, store$.value.view.tempFocusedCellContent)
      ).pipe(
        mergeMapTo(
          from([
            Actions.status.changeDefault(),
            Actions.view.startUpdate()
          ])
        )
      ))
    )


  );
}

function cancelCellChangeEpic(action$: Observable<AnyAction>, store$: StateObservable<RootState>) {
  return action$.pipe(
    ofType(ActionTypes.view.cancelContentChange),
    mapTo(Actions.view.changeTempFocusedCellContent(
      getCellValue(store$.value.file.currentSheet, store$.value.view.focusedCellID)
    ))
  );
}

function changeCellIDEpic(action$: Observable<AnyAction>, store$: StateObservable<RootState>) {
  return action$.pipe(
    ofType(ActionTypes.view.changeFocusedCellID),
    mergeMap(u =>
      from(
        [
          Actions.view.__changeView({
            focusedCellID: u.payload
          }),
          Actions.view.changeTempFocusedCellContent(
            getCellValue(store$.value.file.currentSheet, u.payload)
          ),
        ])
    )
  );
}


// Export
export default [
  submitCellChangeEpic,
  cancelCellChangeEpic,
  changeCellIDEpic
]