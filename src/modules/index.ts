import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import makeRoom from './makeRoom';
import joinRoom from './joinRoom';
import home from './home';
import mainRoom from './mainRoom';

const rootReducer = combineReducers({
  auth,
  user,
  makeRoom,
  joinRoom,
  home,
  mainRoom,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
