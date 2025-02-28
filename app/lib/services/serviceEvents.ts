"use server";

// types
import {
  IEventRequest,
  IDeleteEventRequest,
  IEvent,
} from "@/app/lib/definitions/events";
import { API_EVENTS_ROUTE } from "@/app/lib/definitions/routes";
// utils
import {
  commonFetch,
  DefaultResponse,
  FETCH_METHODS,
} from "@/app/lib/utils/common-fetch";

const fileName = "serviceEvents";

export async function getAllEventsService(): Promise<IEvent[]> {
  const { data } = await commonFetch<DefaultResponse<IEvent[]>>({
    source: { fileName, method: "getAllEventsService" },
    url: API_EVENTS_ROUTE,
  });
  return data;
}

export async function addEventService(reqBody: IEventRequest): Promise<IEvent> {
  const { data } = await commonFetch<DefaultResponse<IEvent>>({
    options: { method: FETCH_METHODS.POST, reqBody },
    source: { fileName, method: "addEventService" },
    url: API_EVENTS_ROUTE,
  });
  return data;
}

export async function updateEventService(
  reqBody: IEventRequest
): Promise<IEvent> {
  const { data } = await commonFetch<DefaultResponse<IEvent>>({
    options: { method: FETCH_METHODS.PUT, reqBody: { name: reqBody.name } },
    source: { fileName, method: "updateEventService" },
    url: `${API_EVENTS_ROUTE}/${reqBody.id}`,
  });
  return data;
}

export async function deleteEventService(
  reqBody: IDeleteEventRequest
): Promise<null> {
  await commonFetch<Response>({
    options: { method: FETCH_METHODS.DELETE },
    source: { fileName, method: "deleteEventService" },
    url: `${API_EVENTS_ROUTE}/${reqBody.eventId}`,
  });
  return null;
}
