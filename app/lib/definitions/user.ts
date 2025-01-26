export type IUser = {
  email: string;
  id: string;
  lastName: string;
  name: string;
  password: string;
  username: string;
};

/** Requests */

export type IUserLoginRequest = {
  email: string;
  password: string;
};

export type IUserRegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
};
