import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../modules';
import { getRoomThunk, resetRooms } from '../modules/home';
import { resetRoomData } from '../modules/mainRoom';

export default function useHome() {
  const { loading, rooms, error } = useSelector((state: RootState) => state.home);

  const dispatch = useDispatch();

  const getRoomsRequest = useCallback(() => {
    dispatch(resetRoomData());
    dispatch(getRoomThunk());
  }, [dispatch]);

  const resetRoomsRequest = useCallback(() => {
    dispatch(resetRooms());
  }, [dispatch]);

  return { getRoomsRequest, rooms, error, loading, resetRoomsRequest };
}
