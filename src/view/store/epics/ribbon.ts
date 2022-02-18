import { AnyAction } from "redux";
import Rxjs, { Observable, takeUntil, race, of, mapTo, mergeMap,switchMap, merge, mergeMapTo, from, take, map } from 'rxjs';
import { ofType, StateObservable } from "redux-observable";
import { RootState } from "../state";
import Actions, { ActionTypes } from "../actions";
const { ribbon: RibbonActions } = Actions;


import { IBookTemplateViewModel } from "../state/ribbon";

// const imgPath = require('@/view/components/Ribbon/Stage/blankbook.jpg');
// console.log(imgPath);


const fakeLocalTemplate: IBookTemplateViewModel[] = [{
  name: '空白工作簿',
  url: '(default)',
  picUrl: require('@/view/components/Ribbon/Stage/blankbook.jpg')
},
{
  name: '待办列表',
  url: 'C:\\ZXSheets\\todo.zxt',
  picUrl: require('../../components/Ribbon/Stage/blankbook.jpg')
}];

async function fakeGetLocalTemplate(): Promise<IBookTemplateViewModel[]> {

  const delay = (time: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };
  await delay(2000);

  return fakeLocalTemplate;
}

async function fakeGetRemoteTemplate(): Promise<IBookTemplateViewModel[]> {

  const delay = (time: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };
  await delay(10000);

  return [];
}



function fetchLocalTemplateEpic(action$: Observable<AnyAction>, store$: StateObservable<RootState>) { // action$ is a stream of actions

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

function fetchRemoteTemplateEpic(action$: Observable<AnyAction>, store$: StateObservable<RootState>) { // action$ is a stream of actions

  return action$.pipe(
    ofType(ActionTypes.ribbon.fetchRemoteTemplate),
    switchMap(u=>
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


export default [
  fetchLocalTemplateEpic,
  fetchRemoteTemplateEpic
]