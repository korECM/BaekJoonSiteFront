import { createAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { joinRoomAPI } from '../api/joinRoom';

const JOIN_ROOM_REQUEST = 'joinRoom/JOIN_ROOM_REQUEST' as const;
const JOIN_ROOM_REQUEST_SUCCESS = 'joinRoom/JOIN_ROOM_REQUEST_SUCCESS' as const;
const JOIN_ROOM_REQUEST_FAIL = 'joinRoom/JOIN_ROOM_REQUEST_FAIL' as const;

interface changeInputInterface {
  name: string;
  value: string;
}

export const joinRoomRequest = createAction(JOIN_ROOM_REQUEST)();
export const joinRoomRequestSuccess = createAction(JOIN_ROOM_REQUEST_SUCCESS)<string>();
export const joinRoomRequestFail = createAction(JOIN_ROOM_REQUEST_FAIL)();

type JoinRoomAction = ReturnType<typeof joinRoomRequest> | ReturnType<typeof joinRoomRequestSuccess> | ReturnType<typeof joinRoomRequestFail>;

interface JoinRoomState {
  error: boolean;
  roomId: string;
}

export function makeRoomThunk(enterId: string): ThunkAction<void, JoinRoomState, null, JoinRoomAction> {
  return async (dispatch) => {
    dispatch(joinRoomRequest());
    try {
      const response = await joinRoomAPI(enterId);
      dispatch(joinRoomRequestSuccess(response.roomId));
    } catch (error) {
      console.error(error);
      dispatch(joinRoomRequestFail());
    }
  };
}

const initialState: JoinRoomState = {
  error: false,
  roomId: '',
};

const makeRoom = createReducer<JoinRoomState, JoinRoomAction>(initialState, {
  [JOIN_ROOM_REQUEST]: (state) => ({
    ...state,
    error: false,
  }),
  [JOIN_ROOM_REQUEST_SUCCESS]: (state, { payload: roomId }) => ({
    ...state,
    roomId,
  }),
  [JOIN_ROOM_REQUEST_FAIL]: (state) => ({
    ...state,
    error: true,
  }),
});

export default makeRoom;
