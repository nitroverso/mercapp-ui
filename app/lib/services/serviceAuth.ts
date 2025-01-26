"use server";

// types
import {
  IUserLoginRequest,
  IUser,
  IUserRegisterRequest,
} from "@/app/lib/definitions/user";
// utils
import { commonFetch } from "@/app/lib/utils/common-fetch";

export async function loginUser(
  params: IUserLoginRequest
): Promise<IUser | undefined> {
  const body = JSON.stringify(params);

  const data = await commonFetch<IUser>({
    // TODO: Save data in Zustand
    options: {
      body,
      method: "POST",
    },
    url: "/auth/login",
  });

  return data;
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
): Promise<IUser | undefined> {
  const body = JSON.stringify(params);

  const data = await commonFetch<IUser>({
    options: {
      body,
      method: "POST",
    },
    url: "/auth/register",
  });

  return data;
}
