import axios from 'axios';

interface getRoomInfoApiRoomData {
  title: string;
  problemPerDay: number;
  _id: string;
  enterId: string;
  recommendedProblems: ProblemAPIInterface[];
}

export interface ProblemAPIInterface {
  id: number;
  level: number;
  solvable: number;
  title: string;
  solved_count: number;
  average_try: number;
}

interface getRoomInfoAPIMembersData {
  difference: number[];
  problems: ProblemAPIInterface[];
  name: string;
  problemForToday: number;
  problemForYesterday: number;
  _id: string;
}

interface getRoomInfoAPIInterface {
  members: getRoomInfoAPIMembersData[];
  room: getRoomInfoApiRoomData;
  user: getRoomInfoAPIMembersData;
  isOwner: boolean;
}

export async function getRoomInfoAPI(roomId: string) {
  const response = await axios.get<getRoomInfoAPIInterface>('http://localhost:4000/room/getRoomInfo/' + roomId, {
    withCredentials: true,
  });
  return response.data;
}

export async function deleteRoomAPI(roomId: string) {
  const response = await axios.get('http://localhost:4000/room/deleteRoom/' + roomId, {
    withCredentials: true,
  });
  return response.data;
}
