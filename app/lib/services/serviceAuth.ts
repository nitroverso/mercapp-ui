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
  IUserRegisterRequest,
} from "@/app/lib/definitions/user";
// utils
import { commonFetch } from "@/app/lib/utils/common-fetch";
import { buildSourceString } from "@/app/lib/utils/errorHandler";

export async function loginUser(
  params: IUserLoginRequest
): Promise<IAuthenticatedUser | undefined> {
  const body = JSON.stringify(params);

  const authenticatedUser = await commonFetch<IAuthenticatedUser>({
    options: {
      body,
      method: "POST",
    },
    source: buildSourceString({ fileName: "serviceAuth", method: "loginUser" }),
    url: API_LOGIN_ROUTE,
  });

  return authenticatedUser;
}

export async function logoutUser(): Promise<unknown> {
  const data = await commonFetch({
    options: { method: "POST" },
    source: buildSourceString({
      fileName: "serviceAuth",
      method: "logoutUser",
    }),
    url: API_LOGOUT_ROUTE,
  });

  return data;
}

export async function registerUser(
  params: IUserRegisterRequest
): Promise<IAuthenticatedUser | undefined> {
  const body = JSON.stringify(params);

  const data = await commonFetch<IAuthenticatedUser>({
    options: {
      body,
      method: "POST",
    },
    source: buildSourceString({
      fileName: "serviceAuth",
      method: "registerUser",
    }),
    url: API_REGISTER_ROUTE,
  });

  return data;
}
