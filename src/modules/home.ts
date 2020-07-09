import { createAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { homeAPI } from '../api/home';

const GET_ROOMS = 'home/GET_ROOMS' as const;
const GET_ROOMS_SUCCESS = 'home/GET_ROOMS_SUCCESS' as const;
const GET_ROOMS_FAIL = 'home/GET_ROOMS_FAIL' as const;

const RESET_ROOMS = 'home/RESET_ROOMS' as const;

export const getRoomRequest = createAction(GET_ROOMS)();
export const getRoomRequestSuccess = createAction(GET_ROOMS_SUCCESS)<RoomInterface[]>();
export const getRoomRequestFail = createAction(GET_ROOMS_FAIL)();

export const resetRooms = createAction(RESET_ROOMS)();

type HomeAction = ReturnType<typeof getRoomRequest> | ReturnType<typeof getRoomRequestSuccess> | ReturnType<typeof getRoomRequestFail> | ReturnType<typeof resetRooms>;

interface RoomInterface {
  title: string;
  num: number;
  id: string;
  problemsPerDay: number;
}

interface HomeState {
  error: boolean;
  rooms: RoomInterface[];
  loading: boolean;
}

export function getRoomThunk(): ThunkAction<void, HomeState, null, HomeAction> {
  return async (dispatch) => {
    dispatch(getRoomRequest());
    try {
      const response = await homeAPI();
      const rooms: RoomInterface[] = response.map((room) => ({
        num: room.members.length,
        title: room.title,
        id: room._id,
        problemsPerDay: room.problemPerDay,
      }));
      dispatch(getRoomRequestSuccess(rooms));
    } catch (error) {
      console.error(error);
      dispatch(getRoomRequestFail());
    }
  };
}

const initialState: HomeState = {
  error: false,
  rooms: [],
  loading: false,
};

const home = createReducer<HomeState, HomeAction>(initialState, {
  [GET_ROOMS]: (state) => ({
    ...state,
    rooms: [],
    error: false,
    loading: true,
  }),
  [GET_ROOMS_SUCCESS]: (state, { payload: rooms }) => ({
    ...state,
    rooms,
    loading: false,
  }),
  [GET_ROOMS_FAIL]: (state) => ({
    ...state,
    error: true,
    loading: false,
  }),
  [RESET_ROOMS]: (state) => ({
    ...state,
    rooms: [],
  }),
});

export default home;
