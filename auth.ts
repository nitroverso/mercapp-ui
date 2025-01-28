import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// services
import { loginUser, logoutUser } from "@/app/lib/services/serviceAuth";
import { IAuthenticatedUser } from "@/app/lib/definitions/user";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    /**
     * By default, TypeScript merges new interface properties and overwrites existing ones.
     * In this case, the default session user properties will be overwritten,
     * with the new ones defined above. To keep the default session user properties,
     * you need to add them back into the newly declared interface.
     */
    user: IAuthenticatedUser & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  events: {
    signOut: async () => {
      await logoutUser();
      console.info("Usuario cerró sesión"); // TODO: Use a events handler to show a toast message or similar
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
          let authenticatedUser = null;

          // logic to salt and hash password
          // const pwHash = saltAndHashPassword(credentials.password);

          // logic to verify if the user exists
          authenticatedUser = await loginUser({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          if (!authenticatedUser) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new Error("Invalid credentials.");
          }

          // return user object with their profile data
          return authenticatedUser;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          // Return `null` to indicate that the credentials are invalid
          return null;
        }
      },
    }),
  ],
  // eslint-disable-next-line sort-keys
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user = token.user as IAuthenticatedUser;
      return session;
    },
  },
});
