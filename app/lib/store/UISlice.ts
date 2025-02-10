import { StateCreator } from "zustand";
// types
import { ALERT_SEVERITY } from "@/app/lib/definitions/ui";

/** *******  UI Slice contexts interface definition ******* */
interface AlertContext {
  message: string;
  severity: ALERT_SEVERITY;
}

interface NavbarContext {
  isOpen: boolean;
}
/** ******* ******* ******* ******* ******* ******* ******* */

/** *******  UI Slice actions interface definition ******* */
interface UIActions {
  uiAlertsActions: {
    clearMessage: () => void;
    setMessage: (message: string, severity: ALERT_SEVERITY) => void;
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
    severity: ALERT_SEVERITY.INFO,
  },
  uiNavbar: {
    isOpen: false,
  },
  // eslint-disable-next-line sort-keys
  uiActions: {
    uiAlertsActions: {
      clearMessage: () =>
        set((state) => ({
          uiAlerts: {
            ...state.uiAlerts,
            message: "",
            severity: ALERT_SEVERITY.INFO,
          },
        })),
      setMessage: (message, severity) =>
        set((state) => ({
          uiAlerts: {
            ...state.uiAlerts,
            message,
            severity,
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
