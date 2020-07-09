import { createAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { RegisterInterface, userRegister } from '../api/register';
import { userLogin, userLogout } from '../api/login';
import { setUser, setError } from './user';
import { UserLoginInterface } from '../api/util';
import { AxiosError } from 'axios';

const CHANGE_INPUT = 'auth/CHANGE_INPUT' as const;
const RESET_FORM = 'auth/RESET_FORM' as const;

const REGISTER = 'auth/REGISTER' as const;
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS' as const;
const REGISTER_FAIL = 'auth/REGISTER_FAIL' as const;

const LOGIN = 'auth/LOGIN' as const;
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS' as const;
const LOGIN_FAIL = 'auth/LOGIN_FAIL' as const;

type FormType = 'login' | 'register';

interface AuthChangeInput {
  form: FormType;
  key: string;
  value: string;
}

export const changeInput = createAction(CHANGE_INPUT)<AuthChangeInput>();
export const resetInput = createAction(RESET_FORM)();

export const register = createAction(REGISTER)();
export const registerSuccess = createAction(REGISTER_SUCCESS)();
export const registerFail = createAction(REGISTER_FAIL)();

export const login = createAction(LOGIN)();
export const loginSuccess = createAction(LOGIN_SUCCESS)();
export const loginFail = createAction(LOGIN_FAIL)();

type AuthAction =
  | ReturnType<typeof changeInput>
  | ReturnType<typeof resetInput>
  | ReturnType<typeof register>
  | ReturnType<typeof registerSuccess>
  | ReturnType<typeof registerFail>
  | ReturnType<typeof login>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginFail>;

export function registerThunk(user: RegisterInterface): ThunkAction<void, AuthState, null, AuthAction | ReturnType<typeof setUser> | ReturnType<typeof setError>> {
  return async (dispatch) => {
    dispatch(register());
    try {
      const { name, email, password } = user;
      const response = await userRegister({
        email,
        name,
        password,
      });
      dispatch(registerSuccess());
      dispatch(setUser({ email, name }));
    } catch (error) {
      if ((error as AxiosError).response?.status === 409) {
        dispatch(setError('해당 이메일로 가입한 계정이 존재합니다'));
      } else {
        dispatch(setError('회원가입 실패'));
      }
      dispatch(registerFail());
    }
  };
}

export function loginThunk(user: UserLoginInterface): ThunkAction<void, AuthState, null, AuthAction | ReturnType<typeof setUser> | ReturnType<typeof setError>> {
  return async (dispatch) => {
    dispatch(login());
    try {
      const { email, password } = user;
      const response = await userLogin({
        email,
        password,
      });
      dispatch(setUser(response));
      dispatch(loginSuccess());
    } catch (error) {
      dispatch(loginFail());
      dispatch(setError('로그인 실패'));
    }
  };
}

export function logoutThunk(): ThunkAction<void, AuthState, null, AuthAction | ReturnType<typeof setUser> | ReturnType<typeof setError>> {
  return async (dispatch) => {
    try {
      await userLogout();
      dispatch(setUser(null));
      try {
        localStorage.removeItem('user');
      } catch (error) {}
    } catch (error) {}
  };
}

export interface LoginState {
  email: string;
  password: string;
  loading: boolean;
  error: boolean;
}

export interface RegisterState {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  loading: boolean;
  error: boolean;
}

export interface AuthState {
  login: LoginState;
  register: RegisterState;
}

const initialState: AuthState = {
  login: {
    email: '',
    password: '',
    loading: false,
    error: false,
  },
  register: {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    loading: false,
    error: false,
  },
};

const auth = createReducer<AuthState, AuthAction>(initialState, {
  [CHANGE_INPUT]: (state, { payload }) => ({
    ...state,
    [payload.form]: {
      ...state[payload.form],
      [payload.key]: payload.value,
    },
  }),
  [RESET_FORM]: () => initialState,
  [REGISTER]: (state) => ({
    ...state,
    register: {
      ...state.register,
      loading: true,
    },
  }),
  [REGISTER_FAIL]: (state) => ({
    ...state,
    register: {
      ...state.register,
      error: true,
      loading: false,
    },
  }),
  [REGISTER_SUCCESS]: (state) => ({
    ...state,
    register: {
      ...state.register,
      error: false,
      loading: false,
    },
  }),
  [LOGIN]: (state) => ({
    ...state,
    login: {
      ...state.login,
      loading: true,
    },
  }),
  [LOGIN_FAIL]: (state) => ({
    ...state,
    login: {
      ...state.login,
      error: true,
      loading: false,
    },
  }),
  [LOGIN_SUCCESS]: (state) => ({
    ...state,
    login: {
      ...state.login,
      error: false,
      loading: false,
    },
  }),
});

export default auth;
