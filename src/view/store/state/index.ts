import view from './view'
import file from './file'

const rootState = {
  view,
  file
};

export type RootState = typeof rootState;

export default rootState;