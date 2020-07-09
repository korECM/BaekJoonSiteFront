import { createAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { MakeRoomInterface, makeRoomAPI } from '../api/makeRoom';

const CHANGE_INPUT = 'makeRoom/CHANGE_INPUT' as const;

const MAKE_ROOM_REQUEST = 'makeRoom/MAKE_ROOM_REQUEST' as const;
const MAKE_ROOM_REQUEST_SUCCESS = 'makeRoom/MAKE_ROOM_REQUEST_SUCCESS' as const;
const MAKE_ROOM_REQUEST_FAIL = 'makeRoom/MAKE_ROOM_REQUEST_FAIL' as const;

const SET_ERROR_MESSAGE = 'makeRoom/SET_ERROR_MESSAGE' as const;

const GO_ROOM = 'makeRoom/GO_ROOM' as const;

const RESET = 'makeRoom/RESET' as const;

interface changeInputInterface {
  name: string;
  value: string;
}

export const changeInput = createAction(CHANGE_INPUT)<changeInputInterface>();

export const makeRoomRequest = createAction(MAKE_ROOM_REQUEST)();
export const makeRoomRequestSuccess = createAction(MAKE_ROOM_REQUEST_SUCCESS)();
export const makeRoomRequestFail = createAction(MAKE_ROOM_REQUEST_FAIL)();

export const setErrorMessage = createAction(SET_ERROR_MESSAGE)<string>();

export const goRoom = createAction(GO_ROOM)<string>();

export const reset = createAction(RESET)();

type MakeRoomAction =
  | ReturnType<typeof changeInput>
  | ReturnType<typeof makeRoomRequest>
  | ReturnType<typeof makeRoomRequestSuccess>
  | ReturnType<typeof makeRoomRequestFail>
  | ReturnType<typeof goRoom>
  | ReturnType<typeof setErrorMessage>
  | ReturnType<typeof reset>;

interface MakeRoomState {
  form: {
    title: string;
    size: string;
    problemPerDay: string;
    minProblemLevel: string;
    maxProblemLevel: string;
  };
  loading: boolean;
  errorMessage: string;
  roomLink: string;
}

export function makeRoomThunk(room: MakeRoomInterface): ThunkAction<void, MakeRoomState, null, MakeRoomAction> {
  return async (dispatch) => {
    dispatch(makeRoomRequest());
    try {
      const response = await makeRoomAPI(room);
      dispatch(makeRoomRequestSuccess());
      dispatch(goRoom('/room/' + response._id));
    } catch (error) {
      console.error(error);
      dispatch(makeRoomRequestFail());
    }
  };
}

const initialState: MakeRoomState = {
  form: {
    title: '',
    size: '',
    problemPerDay: '',
    minProblemLevel: '',
    maxProblemLevel: '',
  },
  loading: false,
  errorMessage: '',
  roomLink: '',
};

const makeRoom = createReducer<MakeRoomState, MakeRoomAction>(initialState, {
  [CHANGE_INPUT]: (state, { payload }) => ({
    ...state,
    form: {
      ...state.form,
      [payload.name]: payload.value,
    },
  }),
  [MAKE_ROOM_REQUEST]: (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  }),
  [MAKE_ROOM_REQUEST_FAIL]: (state) => ({
    ...state,
    loading: false,
  }),
  [MAKE_ROOM_REQUEST_SUCCESS]: (state) => ({
    ...state,
    loading: false,
  }),
  [GO_ROOM]: (state, { payload: roomLink }) => ({
    ...state,
    roomLink,
  }),
  [SET_ERROR_MESSAGE]: (state, { payload: errorMessage }) => ({
    ...state,
    errorMessage,
  }),
  [RESET]: (state) => initialState,
});

export default makeRoom;
