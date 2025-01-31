type IUserSession = {
  email: string;
  email_confirmed_at: string;
};

export type IUser = {
  birthday: string;
  firstName: string;
  id: string;
  lastName: string;
};

// Contract of serialized user once authenticated
export type IAuthenticatedUser = {
  id: string; // Credentials Provider, authorize function needs this
  email: string; // Credentials Provider, session callback function needs this
  emailVerified: Date; // Credentials Provider, session callback function needs this
  token: string;
  profile: IUser;
};

/** ******* SignIn Requests ******* */
export type IUserLoginRequest = {
  email: string;
  password: string;
};

export type IUserLoginResponse = {
  id: string;
  jwt: string;
  session: IUserSession;
  user: IUser;
};
/** ******* END OF: SignIn Requests ******* */

/** ******* SignUp Requests ******* */
export type IUserRegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
};
/** ******* END OF: SignUp Requests ******* */
