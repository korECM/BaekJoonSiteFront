import axios from 'axios';

export async function joinRoomAPI(enterId: string) {
  const response = await axios.get('http://localhost:4000/room/enterRoom/' + enterId, {
    withCredentials: true,
  });
  return response.data;
}
