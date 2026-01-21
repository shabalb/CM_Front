export interface IUser {
  id: number;
  name: string;
  password: string;
}

export interface IAuthRequest {
  name: string;
  password: string; 
}

export interface IAuthResponse {
    user: IUser;
    passed: boolean;
}