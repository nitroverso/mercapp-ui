import { StateCreator } from "zustand";
// types
import { IUnit } from "@/app/lib/definitions/units";

/** *******  Units Slice contexts interface definition ******* */
interface UnitsContext {
  loadingUnits: boolean;
  list: IUnit[];
}
/** ******* ******* ******* ******* ******* ******* ******* */

/** *******  Units Slice actions interface definition ******* */
interface UnitsActions {
  setUnits: (units: IUnit[]) => void;
  setLoadingUnits: (isLoading: boolean) => void;
}
/** ******* ******* ******* ******* ******* ******* ******* */

export interface UnitsSlice {
  units: UnitsContext;
  unitsActions: UnitsActions;
}

export const createUnitsSlice: StateCreator<UnitsSlice, [], [], UnitsSlice> = (
  set
) => ({
  units: { list: [], loadingUnits: false },
  unitsActions: {
    setUnits: (unitsList) =>
      set((state) => ({
        units: { ...state.units, list: unitsList },
      })),
    setLoadingUnits: (isLoading) =>
      set((state) => ({
        units: { ...state.units, loadingUnits: isLoading },
      })),
  },
});
