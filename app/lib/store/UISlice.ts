import { StateCreator } from "zustand";
// types
import { ALERT_POSITION, ALERT_SEVERITY } from "@/app/lib/definitions/ui";

/** *******  UI Slice contexts interface definition ******* */
interface AlertContext {
  message: string;
  severity: ALERT_SEVERITY;
  position: ALERT_POSITION;
}

interface NavbarContext {
  isOpen: boolean;
}
/** ******* ******* ******* ******* ******* ******* ******* */

/** *******  UI Slice actions interface definition ******* */
interface UIActions {
  uiAlertsActions: {
    clearMessage: () => void;
    setMessage: (
      message: string,
      severity: ALERT_SEVERITY,
      position?: ALERT_POSITION
    ) => void;
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
    position: ALERT_POSITION.BOTTOM,
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
            position: ALERT_POSITION.BOTTOM,
            severity: ALERT_SEVERITY.INFO,
          },
        })),
      setMessage: (message, severity, position = ALERT_POSITION.BOTTOM) =>
        set((state) => ({
          uiAlerts: {
            ...state.uiAlerts,
            message,
            position,
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
