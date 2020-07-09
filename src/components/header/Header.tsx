import React, { useEffect, useCallback } from 'react';
import className from 'classnames/bind';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import useHeader from '../../hooks/useHeader';
import styled from 'styled-components';
import styles from './Header.module.scss';
import Button from '../common/Button';

const cx = className.bind(styles);

const LoginUserContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  color: white;
`;

const ButtonWithMargin = styled(Button)`
  margin-left: 0.5rem;
`;

function Header({ history }: RouteComponentProps) {
  const { user: userObject, checkLogin, logout, roomTitle } = useHeader();
  const user = userObject.user;

  const logOutHandler = useCallback(() => {
    logout();
    history.push('/');
    window.location.reload();
  }, [logout, history]);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return (
    <div className={cx('header')}>
      <Link to="/">
        <span>{`BaekJoon${roomTitle && ` - ${roomTitle}`}`}</span>
      </Link>
      <ul className={cx('user')}>
        <li>
          {user ? (
            <LoginUserContainer>
              <UserName>
                <div>{user.name}</div>
              </UserName>
              <ButtonWithMargin color="white" hovercolor="#e5e5e5" textcolor="#0198e1" to="/makeRoom">
                방 만들기
              </ButtonWithMargin>
              <ButtonWithMargin color="#ff4136" hovercolor="#ff716a" textcolor="white" onClick={logOutHandler}>
                로그아웃
              </ButtonWithMargin>
            </LoginUserContainer>
          ) : (
            <Button color="white" hovercolor="#F2F2F2" textcolor="#0198e1" to="/login">
              로그인
            </Button>
          )}
        </li>
      </ul>
    </div>
  );
}

export default withRouter(Header);
