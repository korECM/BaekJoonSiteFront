import axios from 'axios';

export interface MakeRoomInterface {
  title: string;
  // size: string;
  problemPerDay: string;
  minProblemLevel: string;
  maxProblemLevel: string;
}

export interface MakeRoomResponse {
  enterId: string;
  problemPerDay: number;
  size: number;
  title: string;
  _id: string;
}

export async function makeRoomAPI(room: MakeRoomInterface) {
  const response = await axios.post<MakeRoomResponse>('http://localhost:4000/room/makeRoom', room, {
    withCredentials: true,
  });
  return response.data;
}
