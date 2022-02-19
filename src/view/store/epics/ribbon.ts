import { AnyAction } from "redux";
import {
  Observable, mergeMap, mergeAll, race, of, mapTo, switchMap, merge, from, take, map
} from 'rxjs';
import { ofType, StateObservable } from "redux-observable";
import { RootState } from "../state";
import Actions, { ActionTypes } from "../actions";

const { ribbon: RibbonActions } = Actions;

import { IBookTemplateViewModel } from "../state/ribbon";
import { Context, createBook, setActiveBook } from "@/core/context";

// const imgPath = require('@/view/components/Ribbon/Stage/blankbook.jpg');
// console.log(imgPath);


const fakeLocalTemplate: IBookTemplateViewModel[] = [
  {
    name: '空白工作簿',
    url: '(default)',
    picUrl: require('@/view/components/Ribbon/Stage/blankbook.jpg')
  },
  {
    name: '待办列表',
    url: 'C:\\ZXSheets\\todo.zxt',
    picUrl: require('../../components/Ribbon/Stage/blankbook.jpg')
  }
];

const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

async function fakeGetLocalTemplate(): Promise<IBookTemplateViewModel[]> {

  await delay(1000);

  return fakeLocalTemplate;
}

async function fakeGetRemoteTemplate(): Promise<IBookTemplateViewModel[]> {

  await delay(10000);

  return [];
}

// Epics

function fetchLocalTemplateEpic(action$: Observable<AnyAction>, store$: StateObservable<RootState>) {

  return action$.pipe(
    ofType(ActionTypes.ribbon.fetchLocalTemplate),
    switchMap(u =>
      merge(
        of(
          RibbonActions.__changeRibbon({
            localTemplateLoading: true
          }),
        ),
        from(fakeGetLocalTemplate()).pipe(
          map(resp => RibbonActions.__changeRibbon({
            localTemplate: resp,
            localTemplateLoading: false
          })),
        )
      )
    )
  );
}

function fetchRemoteTemplateEpic(action$: Observable<AnyAction>, store$: StateObservable<RootState>) {
  return action$.pipe(
    ofType(ActionTypes.ribbon.fetchRemoteTemplate),
    switchMap(u =>
      merge(
        from([
          RibbonActions.__changeRibbon({
            remoteTemplateLoading: true
          }),
        ]),
        race(
          from(fakeGetRemoteTemplate()).pipe(
            map(resp => RibbonActions.__changeRibbon({
              remoteTemplate: resp,
              remoteTemplateLoading: false
            }))),
          action$.pipe(
            ofType(ActionTypes.ribbon.cancelFetchRemoteTemplate),
            mapTo(RibbonActions.__changeRibbon({
              remoteTemplateLoading: false
            })),
            take(1)
          )
        )
      )
    )
  );
}

async function createAndOpen(templateNameUrl: string) {
  await delay(1000);
  const book = createBook(templateNameUrl);
  setActiveBook(book);
  return book;
}

function newFileEpic(action$: Observable<AnyAction>, store$: StateObservable<RootState>) {
  return action$.pipe(
    ofType(ActionTypes.ribbon.newFile),
    mergeMap(u => merge(
      from([
        Actions.status.__changeStatus({
          desc: '正在创建文件',
          progress: 'indeterminate'
        }),
        Actions.ribbon.changeDisabled(true),
        Actions.ribbon.changeBackStageOpend(false),
      ]),
      from(createAndOpen(u.payload)).pipe(
        mergeMap(p => from([
          Actions.status.changeDefault(),
          Actions.ribbon.changeDisabled(false),
          Actions.file.changeCurrentBook(Context.book),
          Actions.file.changeCurrentSheet(Context.sheet),
        ]))
      )
    )),
  )

}


export default [
  fetchLocalTemplateEpic,
  fetchRemoteTemplateEpic,
  newFileEpic
]