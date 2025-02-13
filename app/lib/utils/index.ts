// types
import { IUnit, UNITS } from "@/app/lib/definitions/units";

export const getUnitLabel = (unit: IUnit) => {
  return unit.name === UNITS.AMOUNT ? "" : ` ${unit.name}`;
};
