import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Button from '../common/Button';
import { RegisterState, LoginState } from '../../modules/auth';
import Loading from '../common/Loading';

const AuthFormBlock = styled.div`
  h3 {
    margin-top: 0.5rem;
    margin-bottom: 0.75rem;
  }
`;

const StyledInput = styled.input`
  border: none;
  border-bottom: lightgray 0.5px solid;

  outline: none;
  background: white;
  padding: 0.7rem 0;
  font-size: 0.8rem;
  width: 100%;
  & + & {
    margin-top: 1.5rem;
  }
`;

const ButtonMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const Footer = styled.div`
  margin-top: 1.5rem;
  text-align: right;
  text-decoration: underline;
  font-size: 0.8rem;
  letter-spacing: 1px;
  a {
    color: gray;
  }
`;

const AuthMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  margin-top: 0.5rem;
  visibility: hidden;
  min-height: 16px;
  ${(prop: AuthMessageProps) =>
    prop.show &&
    css`
      visibility: visible;
    `}
`;

interface AuthMessageProps {
  show: boolean;
}

type AuthType = 'login' | 'register';

interface AuthFormProps {
  type: AuthType;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setMessage: (message: string) => void;
  form: RegisterState | LoginState;
  message: string;
  error: boolean;
  loading: boolean;
}

const emailRule = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/; //이메일 정규식

function AuthForm({ type, onChange, onSubmit, form, message, setMessage, error, loading }: AuthFormProps) {
  let [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    if (error) {
      return;
    }
    if (type === 'login') {
      if (form.email.length && form.password.length) {
        setMessage('');
        setSubmitDisabled(false);
      } else {
        setSubmitDisabled(true);
        // setMessage('빈 칸을 모두 입력하세요');
      }
    } else {
      let registerForm = form as RegisterState;

      // if ((registerForm.name.length && registerForm.name.length < 2) || registerForm.name.length > 6) {
      //   setMessage('닉네임은 2~6글자여야 합니다');
      //   setSubmitDisabled(true);
      //   return;
      // }

      if (registerForm.email.length && emailRule.test(registerForm.email) === false) {
        setMessage('올바른 이메일이 아닙니다');
        setSubmitDisabled(true);
        return;
      }

      if (registerForm.password.length && (registerForm.password.length < 8 || registerForm.password.length > 16)) {
        setMessage('비밀번호는 8~16글자로 이루어져야 합니다');
        setSubmitDisabled(true);
        return;
      }

      if (registerForm.passwordConfirm.length && registerForm.password.length && registerForm.password !== registerForm.passwordConfirm) {
        setMessage('비밀번호가 일치하지 않습니다');
        setSubmitDisabled(true);
        return;
      }

      setMessage('');
      if (registerForm.email.length && registerForm.password.length && registerForm.passwordConfirm.length && registerForm.name.length) {
        setSubmitDisabled(false);
      } else {
        setSubmitDisabled(true);
      }
    }
  }, [form, error, type]);

  return (
    <AuthFormBlock>
      <h3>{type === 'login' ? '로그인' : '회원가입'}</h3>
      <form onSubmit={onSubmit}>
        {type === 'register' && <StyledInput name="name" placeholder="닉네임" onChange={onChange} value={(form as RegisterState).name} />}
        <StyledInput name="email" placeholder="아이디(이메일)" onChange={onChange} value={form.email} />
        <StyledInput name="password" placeholder="비밀번호" type="password" onChange={onChange} value={form.password} />
        {type === 'register' && <StyledInput name="passwordConfirm" placeholder="비밀번호 확인" type="password" onChange={onChange} value={(form as RegisterState).passwordConfirm} />}
        <AuthMessage show={message.length > 0}>{message}</AuthMessage>
        <ButtonMarginTop fullwidth color={'#0198e1'} hovercolor={'#38b0de'} textcolor={'white'} disabled={submitDisabled}>
          {loading ? <Loading type={'bars'} color={'white'} /> : type === 'login' ? '로그인' : '회원가입'}
        </ButtonMarginTop>
      </form>
      <Footer>
        <Link to={`/${type === 'login' ? 'join' : 'login'}`}>{type === 'login' ? '회원가입' : '로그인'}</Link>
      </Footer>
    </AuthFormBlock>
  );
}

export default AuthForm;
