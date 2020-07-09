import { createAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { getRoomInfoAPI, deleteRoomAPI, ProblemAPIInterface } from '../api/mainRoom';

const GET_ROOM_INFO = 'mainRoom/GET_ROOM_INFO' as const;
const GET_ROOM_INFO_SUCCESS = 'mainRoom/GET_ROOM_INFO_SUCCESS' as const;
const GET_ROOM_INFO_FAIL = 'mainRoom/GET_ROOM_INFO_FAIL' as const;

const RESET_ROOM_DATA = 'mainRoom/RESET_ROOM_DATA' as const;

const MAKE_LOADING = 'mainRoom/MAKE_LOADING' as const;

const DELETE_ROOM = 'mainRoom/DELETE_ROOM' as const;

export const getRoomInfo = createAction(GET_ROOM_INFO)();
export const getRoomInfoSuccess = createAction(GET_ROOM_INFO_SUCCESS)<RoomDataInterface>();
export const getRoomInfoFail = createAction(GET_ROOM_INFO_FAIL)();

export const resetRoomData = createAction(RESET_ROOM_DATA)();

export const makeLoading = createAction(MAKE_LOADING)();

export const deleteRoom = createAction(DELETE_ROOM)();

type MainRoomAction =
  | ReturnType<typeof getRoomInfo>
  | ReturnType<typeof getRoomInfoSuccess>
  | ReturnType<typeof getRoomInfoFail>
  | ReturnType<typeof resetRoomData>
  | ReturnType<typeof makeLoading>
  | ReturnType<typeof deleteRoom>;

interface RoomInterface {
  title: string;
  problemPerDay: number;
  _id: string;
  enterId: string;
  recommendedProblems: ProblemAPIInterface[];
}

export interface RoomMemberInterface {
  name: string;
  problemForToday: number;
  problemForYesterday: number;
  difference: number[];
  problems: ProblemAPIInterface[];
  _id: string;
}
interface RoomDataInterface {
  members: RoomMemberInterface[];
  room: RoomInterface;
  user: RoomMemberInterface;
  isOwner: boolean;
}

interface MainRoomState {
  members: RoomMemberInterface[];
  loading: boolean;
  error: boolean;
  room: RoomInterface;
  user: RoomMemberInterface | null;
  isOwner: boolean;
  isDeleted: boolean;
}

export function makeRoomThunk(roomId: string): ThunkAction<void, MainRoomState, null, MainRoomAction> {
  return async (dispatch) => {
    dispatch(getRoomInfo());
    try {
      const response = await getRoomInfoAPI(roomId);
      console.log(response);
      dispatch(getRoomInfoSuccess(response));
    } catch (error) {
      console.error(error);
      dispatch(getRoomInfoFail());
    }
  };
}

export function deleteRoomThunk(roomId: string): ThunkAction<void, MainRoomState, null, MainRoomAction> {
  return async (dispatch) => {
    try {
      await deleteRoomAPI(roomId);
      dispatch(deleteRoom());
    } catch (error) {
      console.error(error);
    }
  };
}

const initialState: MainRoomState = {
  loading: true,
  error: false,
  members: [],
  room: {
    title: '',
    problemPerDay: 0,
    _id: '',
    enterId: '',
    recommendedProblems: [],
  },
  user: null,
  isOwner: false,
  isDeleted: false,
};

const mainRoom = createReducer<MainRoomState, MainRoomAction>(initialState, {
  [GET_ROOM_INFO]: (state) => ({
    ...state,
    error: false,
    loading: true,
  }),
  [GET_ROOM_INFO_FAIL]: (state) => ({
    ...state,
    error: true,
    loading: false,
  }),
  [GET_ROOM_INFO_SUCCESS]: (state, { payload: roomData }) => ({
    ...state,
    members: roomData.members,
    room: roomData.room,
    user: roomData.user,
    loading: false,
    isOwner: roomData.isOwner,
  }),
  [RESET_ROOM_DATA]: (state) => ({
    ...state,
    room: {
      problemPerDay: 0,
      title: '',
      _id: '',
      enterId: '',
      recommendedProblems: [],
    },
    isDeleted: false,
  }),
  [MAKE_LOADING]: (state) => ({
    ...state,
    loading: true,
  }),
  [DELETE_ROOM]: (state) => ({
    ...state,
    isDeleted: true,
  }),
});

export default mainRoom;
