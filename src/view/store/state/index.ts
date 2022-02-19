import view from './view'
import file from './file'
import ribbon from './ribbon'
import status from './status'

const rootState = {
  view,
  file,
  ribbon,
  status
};

export type RootState = typeof rootState;

export default rootState;