"use server";

// types
import { API_UNITS_ROUTE } from "@/app/lib/definitions/routes";
import { IUnit } from "@/app/lib/definitions/units";
// utils
import { commonFetch, DefaultResponse } from "@/app/lib/utils/common-fetch";

const fileName = "serviceUnits";

export async function getAllUnitsService(): Promise<IUnit[]> {
  const { data } = await commonFetch<DefaultResponse<IUnit[]>>({
    source: { fileName, method: "getAllUnitsService" },
    url: API_UNITS_ROUTE,
  });
  return data;
}
