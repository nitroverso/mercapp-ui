"use server";

// types
import {
  IAuthenticatedUser,
  IUserLoginRequest,
  IUserRegisterRequest,
} from "@/app/lib/definitions/user";
// utils
import { commonFetch } from "@/app/lib/utils/common-fetch";

export async function loginUser(
  params: IUserLoginRequest
): Promise<IAuthenticatedUser | undefined> {
  const body = JSON.stringify(params);

  const authenticatedUser = await commonFetch<IAuthenticatedUser>({
    options: {
      body,
      method: "POST",
    },
    url: "/auth/login",
  });

  return authenticatedUser;
}

export async function logoutUser(): Promise<unknown> {
  const data = await commonFetch({
    options: { method: "POST" },
    url: "/auth/logout",
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
    url: "/auth/register",
  });

  return data;
}
