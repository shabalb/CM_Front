export interface IUser {
  id: number;
  name: string;
  password: string;
}

export interface IRegisterRequest {
  name: string;
  password: string; 
}