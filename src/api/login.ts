import axios from 'axios';
import { UserInterface } from '../modules/user';

export interface LoginInterface {
  email: string;
  password: string;
}

export interface LoginResponse extends UserInterface {}

export async function userLogin(user: LoginInterface) {
  const response = await axios.post<LoginResponse>('http://localhost:4000/auth/login', user, {
    withCredentials: true,
  });
  return response.data;
}

export async function userLoginCheck() {
  const response = await axios.get('http://localhost:4000/auth/check', {
    withCredentials: true,
  });
  return response.data as UserInterface;
}

export async function userLogout() {
  await axios.get('http://localhost:4000/auth/logout', {
    withCredentials: true,
  });
}
