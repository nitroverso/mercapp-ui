"use server";

// types
import {
  API_LOGIN_ROUTE,
  API_LOGOUT_ROUTE,
  API_REGISTER_ROUTE,
} from "@/app/lib/definitions/routes";
import {
  IAuthenticatedUser,
  IUserLoginRequest,
  IUserLoginResponse,
  IUserRegisterRequest,
} from "@/app/lib/definitions/user";
// utils
import { commonFetch, FETCH_METHODS } from "@/app/lib/utils/common-fetch";

const fileName = "serviceAuth";

export async function loginUser(
  reqBody: IUserLoginRequest
): Promise<IAuthenticatedUser | undefined> {
  const response = await commonFetch<IUserLoginResponse>({
    options: {
      method: FETCH_METHODS.POST,
      reqBody,
    },
    source: { fileName, method: "loginUser" },
    url: API_LOGIN_ROUTE,
  });

  const authenticatedUser: IAuthenticatedUser = {
    email: response.session.email,
    emailVerified: new Date(response.session.email_confirmed_at),
    id: response.id,
    profile: { ...response.user },
    token: response.jwt,
  };

  return authenticatedUser;
}

export async function logoutUser(): Promise<unknown> {
  const data = await commonFetch({
    options: { method: FETCH_METHODS.POST },
    source: { fileName, method: "logoutUser" },
    url: API_LOGOUT_ROUTE,
  });

  return data;
}

export async function registerUser(
  reqBody: IUserRegisterRequest
): Promise<unknown> {
  const data = await commonFetch({
    options: {
      method: FETCH_METHODS.POST,
      reqBody,
    },
    source: { fileName, method: "registerUser" },
    url: API_REGISTER_ROUTE,
  });

  return data;
}
