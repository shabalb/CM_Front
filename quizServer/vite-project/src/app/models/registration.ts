export interface IUser {
  id: number;
  name: string;
  password: string;
}

export interface IRegisterRequest {
  username: string;
  password: string; 
}

export interface IRegisterResponse {
  id: number;
  username: string;
}