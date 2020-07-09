import React, { useEffect } from 'react';
import Loading from '../../common/Loading';
import useJoinRoom from '../../../hooks/useJoinRoom';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

const JoinRoomContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 20%;
`;

interface JoinRoomProps extends RouteComponentProps {}

function JoinRoom({ history, match }: JoinRoomProps) {
  const { error, joinRoom, roomId } = useJoinRoom();

  useEffect(() => {
    const enterId = (match.params as any).enterId;
    if (enterId) {
      joinRoom(enterId);
    } else {
      history.push('/');
    }
  }, [history, joinRoom, match.params]);

  if (roomId) {
    history.push('/room/' + roomId);
  }

  if (error) return <div>방에 입장할 수 있는 권한이 없습니다</div>;

  return (
    <JoinRoomContainer>
      <Loading color="#0198e1" type="spin" size="5%" />
    </JoinRoomContainer>
  );
}

export default JoinRoom;
