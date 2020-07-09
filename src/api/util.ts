import axios from 'axios';

export interface UserLoginInterface {
  password: string;
  email: string;
}

export async function isUserLogin() {
  const response = await axios.get<UserLoginInterface>('http://localhost:4000/auth', {
    withCredentials: true,
  });
  return response.data;
}

export async function logout() {
  await axios.get('http://localhost:4000/auth/logout', {
    withCredentials: true,
  });
}
