import { createAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { userLoginCheck } from '../api/login';

const SET_USER = 'user/SET_USER' as const;

const SET_ERROR = 'user/SET_ERROR' as const;

export interface UserInterface {
  name: string;
  email: string;
}

export const setUser = createAction(SET_USER)<UserInterface | null>();
export const setError = createAction(SET_ERROR)<string>();

export function checkThunk(): ThunkAction<void, UserState, null, UserAction> {
  return async (dispatch) => {
    try {
      await userLoginCheck();
    } catch (error) {
      console.error(error);
      try {
        localStorage.removeItem('user');
        dispatch(setUser(null));
      } catch (error) {
        console.error('localStorage is not working');
      }
    }
  };
}

type UserAction = ReturnType<typeof setUser> | ReturnType<typeof setError>;

export interface UserState {
  errorMessage: string;
  user: UserInterface | null;
}

const initialState: UserState = {
  user: null,
  errorMessage: '',
};

const user = createReducer<UserState, UserAction>(initialState, {
  [SET_USER]: (state, { payload: user }) => ({
    ...state,
    user,
  }),
  [SET_ERROR]: (state, { payload: errorMessage }) => ({
    ...state,
    errorMessage,
  }),
});

export default user;
