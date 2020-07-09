import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../modules';
import { makeRoomThunk } from '../modules/joinRoom';

export default function useJoinRoom() {
  const { error, roomId } = useSelector((state: RootState) => state.joinRoom);

  const dispatch = useDispatch();

  const joinRoom = useCallback(
    (enterId: string) => {
      dispatch(makeRoomThunk(enterId));
    },
    [dispatch],
  );

  return { error, roomId, joinRoom };
}
