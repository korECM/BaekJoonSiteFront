import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Button from '../../common/Button';
import Loading from '../../common/Loading';
import useMakeRoom from '../../../hooks/useMakeRoom';

const RoomFormBlock = styled.div`
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

const StyledInputWithHorizentalMargin = styled(StyledInput)`
  margin-top: 0;
  margin-right: 1rem;
  & + & {
    margin-top: 0;
  }
`;

const ButtonMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const RoomMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  margin-top: 0.5rem;
  visibility: hidden;
  min-height: 16px;
  ${(prop: RoomMessageProps) =>
    prop.show &&
    css`
      visibility: visible;
    `}
`;

interface RoomMessageProps {
  show: boolean;
}

interface RoomFormProps extends RouteComponentProps {}

function RoomForm({ history }: RoomFormProps) {
  let [submitDisabled, setSubmitDisabled] = useState(true);

  const { form, errorMessage, loading, roomLink, onChange, onSubmit, setErrorMessage } = useMakeRoom();

  useEffect(() => {
    // TODO: 방 만들기 폼 체크 추가
    if (form.title.length === 0) {
      setSubmitDisabled(true);
      setErrorMessage('방의 이름을 입력해야 합니다');
      return;
    }
    if (form.title.length > 10) {
      setSubmitDisabled(true);
      setErrorMessage('방의 이름은 10글자를 넘어갈 수 없습니다');
      return;
    }

    if (form.problemPerDay.length === 0) {
      setSubmitDisabled(true);
      setErrorMessage('하루에 풀 문제 수를 입력해야 합니다');
      return;
    }

    if (form.problemPerDay.match(/[^0-9]/g)) {
      setSubmitDisabled(true);
      setErrorMessage('숫자만 입력해야 됩니다');
      return;
    }

    if (parseInt(form.problemPerDay) > 100) {
      setSubmitDisabled(true);
      setErrorMessage('유효하지 않은 값입니다');
      return;
    }

    if (form.minProblemLevel.length === 0) {
      setSubmitDisabled(true);
      setErrorMessage('추천 문제 최소 난이도를 설정해야 합니다');
      return;
    }
    if (form.maxProblemLevel.length === 0) {
      setSubmitDisabled(true);
      setErrorMessage('추천 문제 최대 난이도를 설정해야 합니다');
      return;
    }
    if (parseInt(form.minProblemLevel) < 1) {
      setSubmitDisabled(true);
      setErrorMessage('추천 문제 최소 난이도는 0보다 커야 합니다');
      return;
    }
    if (parseInt(form.maxProblemLevel) < 1) {
      setSubmitDisabled(true);
      setErrorMessage('추천 문제 최대 난이도는 30보다 작거나 같아야 합니다');
      return;
    }
    if (parseInt(form.maxProblemLevel) < parseInt(form.minProblemLevel)) {
      setSubmitDisabled(true);
      setErrorMessage('최소 난이도는 최대 난이도보다 클 수 없습니다');
      return;
    }

    setErrorMessage('');
    setSubmitDisabled(false);
  }, [form, setErrorMessage]);

  if (roomLink) {
    history.push(roomLink);
  }

  return (
    <RoomFormBlock>
      <h3>방 만들기</h3>
      <form onSubmit={onSubmit}>
        <StyledInput name="title" placeholder="방 이름" value={form.title} onChange={onChange} />
        <StyledInput name="problemPerDay" placeholder="하루에 ~문제씩 풀기" type="number" value={form.problemPerDay} onChange={onChange} />
        <RoomMessage show={true} style={{ marginTop: '1.5rem', textAlign: 'left', color: 'black', fontWeight: 'normal' }}>
          문제 추천 범위
        </RoomMessage>
        <div style={{ display: 'flex' }}>
          <StyledInputWithHorizentalMargin name="minProblemLevel" placeholder="~부터" type="number" value={form.minProblemLevel} onChange={onChange} />
          <StyledInputWithHorizentalMargin name="maxProblemLevel" placeholder="~까지" type="number" value={form.maxProblemLevel} onChange={onChange} />
        </div>
        <RoomMessage show={errorMessage.length > 0}>{errorMessage}</RoomMessage>
        <ButtonMarginTop fullwidth color="#0198e1" hovercolor="#38b0de" textcolor="white" disabled={submitDisabled}>
          {loading ? <Loading type={'bars'} color={'white'} /> : '만들기'}
        </ButtonMarginTop>
      </form>
    </RoomFormBlock>
  );
}

export default withRouter(RoomForm);
