import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../modules';
import { changeInput, makeRoomThunk, setErrorMessage, reset } from '../modules/makeRoom';

export default function useMakeRoom() {
  const { form, errorMessage, loading, roomLink } = useSelector((state: RootState) => state.makeRoom);

  const dispatch = useDispatch();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let { name, value } = e.target;
      if (name === 'problemsPerDay') {
        value = value.replace(/[^0-9]/g, '');
      }
      dispatch(changeInput({ name, value }));
    },
    [dispatch],
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(
        makeRoomThunk({
          problemPerDay: form.problemPerDay,
          title: form.title,
          minProblemLevel: form.minProblemLevel,
          maxProblemLevel: form.maxProblemLevel,
        }),
      );
    },
    [dispatch, form],
  );

  const setErrorMessageHandle = useCallback(
    (message: string) => {
      dispatch(setErrorMessage(message));
    },
    [dispatch],
  );

  return { form, errorMessage, loading, roomLink, onChange, onSubmit, setErrorMessage: setErrorMessageHandle };
}
