import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../modules';
import { logoutThunk } from '../modules/auth';
import { checkThunk } from '../modules/user';

export default function useHeader() {
  const user = useSelector((state: RootState) => state.user);
  const { room } = useSelector((state: RootState) => state.mainRoom);

  const roomTitle = room.title;

  const dispatch = useDispatch();

  const checkLogin = useCallback(() => {
    dispatch(checkThunk());
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(logoutThunk());
  }, [dispatch]);

  return { user, checkLogin, logout, roomTitle };
}
