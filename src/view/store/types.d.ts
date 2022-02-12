import { Model as DvaModel, EffectsCommandMap, EffectType } from 'dva'
import { ReducerEnhancer, Reducer } from 'react-redux'
import {AnyAction} from 'redux';
import { ICell } from '../../core/base/cell';
;


declare module "dva-type" {
  export interface TAction<S> extends AnyAction{
    type: any;
    payload?: Partial<S>;
  }
}