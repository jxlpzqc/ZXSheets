import view from './view'
import file from './file'
import ribbon from './ribbon'

const rootState = {
  view,
  file,
  ribbon
};

export type RootState = typeof rootState;

export default rootState;