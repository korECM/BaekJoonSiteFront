import axios from 'axios';

export interface RegisterInterface {
  email: string;
  name: string;
  password: string;
}

export interface RegisterResponse {
  email: string;
  name: string;
}

export interface EmailCheckResponse {
  message: string;
}

export async function userRegister(user: RegisterInterface) {
  const response = await axios.post<RegisterResponse>('http://localhost:4000/auth/join', user, {
    withCredentials: true,
  });
  return response.data;
}

export async function userEmailDuplicatedCheck(email: string) {
  const response = await axios.get<EmailCheckResponse>(`http://localhost:4000/auth/emailCheck/${email}`, {
    withCredentials: true,
  });
  return response.data;
}
