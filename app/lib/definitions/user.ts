export interface IUser {
  email: string;
  id: string;
  lastName: string;
  name: string;
  password: string;
  username: string;
}

/**  */

export interface IUserLoginRequest {
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  email: string;
  password: string;
}
