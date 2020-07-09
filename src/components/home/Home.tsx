import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useHome from '../../hooks/useHome';
import styled from 'styled-components';

const RoomBlock = styled.div`
  background-color: white;
  border-radius: 10px;
  height: 100px;
  width: 180px;
  -webkit-box-shadow: 10px 10px 103px -20px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 10px 10px 103px -20px rgba(0, 0, 0, 0.24);
  box-shadow: 10px 10px 103px -20px rgba(0, 0, 0, 0.24);
`;

const RoomTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #0198e1;
  padding: 1rem;
  padding-bottom: 0.5rem;
`;

const RoomText = styled.div`
  font-size: 0.8rem;
  margin-left: 1.5rem;
  & + & {
    margin-top: 0.2rem;
  }
`;

const HomeContainer = styled.div`
  margin: 3rem;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 5rem;
`;

function Home() {
  const { error, getRoomsRequest, rooms, loading, resetRoomsRequest } = useHome();

  useEffect(() => {
    getRoomsRequest();
    return () => {
      resetRoomsRequest();
    };
  }, [getRoomsRequest]);

  return (
    <HomeContainer>
      {rooms.map((room) => (
        <Link to={`/room/${room.id}`} className="fadein">
          <RoomBlock key={room.id}>
            <RoomTitle>{room.title}</RoomTitle>
            <RoomText>사람 수 : {room.num}</RoomText>
            <RoomText>하루에 : {room.problemsPerDay}문제</RoomText>
          </RoomBlock>
        </Link>
      ))}
    </HomeContainer>
  );
}

export default Home;
