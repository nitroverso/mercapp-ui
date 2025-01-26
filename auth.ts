import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// services
import { loginUser, logoutUser } from "@/app/lib/services/serviceAuth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  events: {
    signOut: async (message) => {
      const data = await logoutUser();
      console.log("Usuario cerró sesión:", message, data); // TODO: Use a events handler to show a toast message or similar
    },
  },
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
          user = await loginUser({
            email: credentials.email as string,
            password: credentials.password as string,
          });

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
