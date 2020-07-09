import axios from 'axios';

interface HomeAPIResponse {
  enterId: string;
  members: string[];
  problemPerDay: number;
  size: number;
  title: string;
  _id: string;
}

export async function homeAPI() {
  const response = await axios.get<HomeAPIResponse[]>('http://localhost:4000/room/getRooms', {
    withCredentials: true,
  });
  return response.data;
}
