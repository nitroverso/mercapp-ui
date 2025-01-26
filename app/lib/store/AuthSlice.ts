import { StateCreator } from "zustand";

/** *******  Auth Slice contexts interface definition ******* */
interface AuthContext {
  isLoading: boolean;
}
/** ******* ******* ******* ******* ******* ******* ******* */

/** *******  Auth Slice actions interface definition ******* */
interface AuthActions {
  toggleLoading: (isLoading: boolean) => void;
}
/** ******* ******* ******* ******* ******* ******* ******* */
export interface AuthSlice {
  auth: AuthContext;
  authActions: AuthActions;
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set
) => ({
  auth: { isLoading: false },
  authActions: {
    toggleLoading: (isLoading: boolean) =>
      set((state) => ({
        auth: { ...state.auth, isLoading },
      })),
  },
});
