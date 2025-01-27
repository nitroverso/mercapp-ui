import { StateCreator } from "zustand";
// types
import { IAuthenticatedUser } from "@/app/lib/definitions/user";

/** *******  Auth Slice contexts interface definition ******* */
interface AuthContext {
  isLoading: boolean;
  session: IAuthenticatedUser | null;
}
/** ******* ******* ******* ******* ******* ******* ******* */

/** *******  Auth Slice actions interface definition ******* */
interface AuthActions {
  toggleLoading: (isLoading: boolean) => void;
  setSession: (session: IAuthenticatedUser | null) => void;
}
/** ******* ******* ******* ******* ******* ******* ******* */
export interface AuthSlice {
  auth: AuthContext;
  authActions: AuthActions;
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set
) => ({
  auth: { isLoading: false, session: null },
  authActions: {
    setSession: (session) =>
      set((state) => ({
        auth: { ...state.auth, session },
      })),
    toggleLoading: (isLoading) =>
      set((state) => ({
        auth: { ...state.auth, isLoading },
      })),
  },
});
