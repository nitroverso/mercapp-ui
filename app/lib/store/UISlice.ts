import { StateCreator } from "zustand";

/** *******  UI Slice contexts interface definition ******* */
interface AlertContext {
  message: string;
}

interface NavbarContext {
  isOpen: boolean;
}
/** ******* ******* ******* ******* ******* ******* ******* */

/** *******  UI Slice actions interface definition ******* */
interface UIActions {
  uiAlertsActions: {
    setMessage: (message: string) => void;
  };
  uiNavbarActions: {
    toggleNavbar: () => void;
  };
}
/** ******* ******* ******* ******* ******* ******* ******* */

export interface UISlice {
  uiAlerts: AlertContext;
  uiNavbar: NavbarContext;
  uiActions: UIActions;
}

export const createUISlice: StateCreator<UISlice> = (set) => ({
  uiAlerts: {
    message: "",
  },
  uiNavbar: {
    isOpen: false,
  },
  // eslint-disable-next-line sort-keys
  uiActions: {
    uiAlertsActions: {
      setMessage: (message: string) =>
        set((state) => ({
          uiAlerts: {
            ...state.uiAlerts,
            message,
          },
        })),
    },
    uiNavbarActions: {
      toggleNavbar: () =>
        set((state) => ({
          uiNavbar: {
            ...state.uiNavbar,
            isOpen: !state.uiNavbar.isOpen,
          },
        })),
    },
  },
});
