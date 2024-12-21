"use server";

import { User } from "@/app/lib/definitions/user";

export async function loginUserWithCredentials(
  email: string,
  password: string
): Promise<User | undefined> {
  const data = await fetch("http://localhost:3000/api/auth/login");
  const response: { users: User[] } = await data.json();
  return response.users.find((user) => {
    console.log({ credentials: { email, password } });
    return user.email === email && user.password === password;
  });
}
