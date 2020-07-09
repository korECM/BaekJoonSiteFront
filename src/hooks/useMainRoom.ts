import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../modules';
import { makeRoomThunk, makeLoading, deleteRoomThunk } from '../modules/mainRoom';
import { reset } from '../modules/makeRoom';

export default function useMainRoom() {
  const { error, loading, members, room, user, isOwner, isDeleted } = useSelector((state: RootState) => state.mainRoom);

  const dispatch = useDispatch();

  const getRoomInfo = useCallback(
    (enterId: string) => {
      dispatch(makeRoomThunk(enterId));
    },
    [dispatch],
  );

  const resetDatas = useCallback(() => {
    dispatch(makeLoading());
  }, [dispatch]);

  const resetMakeRoom = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  const deleteRoom = useCallback(() => {
    console.log(room);
    dispatch(deleteRoomThunk(room._id));
  }, [dispatch, room]);

  return { error, loading, getRoomInfo, resetDatas, deleteRoom, resetMakeRoom, members, room, user, isOwner, isDeleted };
}
