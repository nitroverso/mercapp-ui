import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// services
import { loginUserWithCredentials } from "@/app/lib/services/serviceAuth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/signin",
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      // eslint-disable-next-line sort-keys
      authorize: async (credentials) => {
        try {
          let user = null;

          // logic to salt and hash password
          // const pwHash = saltAndHashPassword(credentials.password);

          // logic to verify if the user exists
          user = await loginUserWithCredentials(
            credentials.email as string,
            credentials.password as string
          );

          if (!user) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new Error("Invalid credentials.");
          }

          // return user object with their profile data
          return user;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          // Return `null` to indicate that the credentials are invalid
          return null;
        }
      },
    }),
  ],
});
