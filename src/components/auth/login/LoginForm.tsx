import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../../modules';
import { changeInput, resetInput, loginThunk } from '../../../modules/auth';
import AuthFrom from '../AuthForm';
import { setError } from '../../../modules/user';

function LoginForm({ history }: RouteComponentProps) {
  const form = useSelector((state: RootState) => state.auth.login);
  const message = useSelector((state: RootState) => state.user.errorMessage);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name: key } = e.target;
    dispatch(
      changeInput({
        form: 'login',
        key,
        value,
      }),
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setError(''));
    dispatch(loginThunk(form));
  };

  const setMessage = (message: string) => {
    dispatch(setError(message));
  };

  useEffect(() => {
    if (user) {
      history.push('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('localStorage is not working');
      }
      return;
    }
    dispatch(resetInput());
    dispatch(setError(''));
  }, [dispatch, user, history]);

  return <AuthFrom type={'login'} onChange={onChange} onSubmit={onSubmit} form={form} message={message} setMessage={setMessage} error={form.error} loading={form.loading} />;
}

export default withRouter(LoginForm);
