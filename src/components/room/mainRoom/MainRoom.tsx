import React, { useEffect, useState, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';
import { RoomMemberInterface } from '../../../modules/mainRoom';
import Table from './components/table/Table';
import TableColumn from './components/table/TableColumn';
import TextSection from './components/OnlyText/TextSection';
import useMainRoom from '../../../hooks/useMainRoom';
import Loading from '../../common/Loading';
import JustSection from './components/JustSection/JustSection';
import Button from '../../common/Button';

const MainRoomContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 5rem;
  grid-row-gap: 2.5rem;

  margin: 2rem;
`;

const ButtonWithVerticalMargin = styled(Button)`
  margin: 1.5rem 0;
`;

function getPrefix(tier: number) {
  if (tier <= 5) return 'b';
  if (tier <= 10) return 's';
  if (tier <= 15) return 'g';
  if (tier <= 20) return 'p';
  if (tier <= 25) return 'd';
  return 'r';
}

function getPostfix(tier: number) {
  if (tier % 10 > 5) {
    return (tier % 10) - 5;
  }
  return tier % 10;
}

function MainRoom({ history, match }: RouteComponentProps) {
  const { error, getRoomInfo, resetDatas, deleteRoom, resetMakeRoom, loading, members, room, user, isOwner, isDeleted } = useMainRoom();

  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (!copied) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);

  useEffect(() => {
    resetMakeRoom();

    const roomId = (match.params as any).roomId;
    if (roomId) {
      getRoomInfo(roomId);
    } else {
      history.push('/');
    }
    return () => {
      resetDatas();
    };
  }, [history, match.params]);

  if (isDeleted) {
    history.push('/');
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30%' }}>
        <Loading type="cylon" size={'5%'} />
      </div>
    );
  }
  if (!user || error) {
    return <div>Error</div>;
  }

  return (
    <MainRoomContainer>
      <Table headers={['이름', '오늘 푼 문제 수', '지금까지 푼 문제 수', '달성 여부']}>
        {members.map((member: RoomMemberInterface) => (
          <TableColumn
            key={member._id}
            contents={[
              member.name,
              `${member.problemForToday - member.problemForYesterday}`,
              `${member.problems.length}`,
              `${member.problemForToday - member.problemForYesterday >= room.problemPerDay ? '✓' : 'X'}`,
            ]}
          />
        ))}
      </Table>
      <Table headers={['이름', '오늘 푼 문제']}>
        {members.map((member: RoomMemberInterface) => {
          let problemsSolvedToday = member.difference.join(', ');
          return <TableColumn key={member._id} contents={[member.name, problemsSolvedToday ? problemsSolvedToday : '아직 푼 문제가 없어요ㅠ']} />;
        })}
      </Table>
      <TextSection
        text={`${Math.max(room.problemPerDay - (user.problemForToday - user.problemForYesterday), 0)} / ${room.problemPerDay}`}
        title="오늘 남은 문제 수"
        color="black"
        fontsize="3rem"
        textalign="center"
      />
      <Table headers={['문제 번호', '문제 이름', '문제 티어', '해결', '평균 시도']}>
        {room.recommendedProblems.map((problem) => {
          return (
            <TableColumn
              key={problem.id}
              contents={[problem.id.toString(), problem.title, `${getPrefix(problem.level)}${getPostfix(problem.level)}`, problem.solved_count.toString(), problem.average_try.toFixed(2).toString()]}
            />
          );
        })}
      </Table>
      <JustSection title="방 공유하기">
        <CopyToClipboard onCopy={handleCopy} text={`http://localhost:3000/joinRoom/${room.enterId}`}>
          <ButtonWithVerticalMargin color={'#0198e1'} hovercolor={'#38b0de'} textcolor={'white'}>
            {copied ? '복사 완료!' : '링크 복사하기'}
          </ButtonWithVerticalMargin>
        </CopyToClipboard>
      </JustSection>
      {isOwner && (
        <JustSection title="방 삭제하기">
          <ButtonWithVerticalMargin color={'#ff6666'} hovercolor={'#ff8d8d'} textcolor={'white'} onClick={deleteRoom}>
            {'방 삭제하기'}
          </ButtonWithVerticalMargin>
        </JustSection>
      )}
    </MainRoomContainer>
  );
}

export default MainRoom;
