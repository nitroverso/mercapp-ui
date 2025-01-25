"use server";

// types
import { IUserLoginRequest, IUser } from "@/app/lib/definitions/user";
// utils
import { commonFetch } from "@/app/lib/utils/common-fetch";

export async function loginUserWithCredentials({
  email,
  password,
}: IUserLoginRequest): Promise<IUser | undefined> {
  const body = JSON.stringify({
    email,
    password,
  });

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
