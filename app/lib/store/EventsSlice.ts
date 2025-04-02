import { StateCreator } from "zustand";
// types
import { IEvent } from "@/app/lib/definitions/events";

/** *******  Events Slice contexts interface definition ******* */
interface EventsContext {
  loadingEvents: boolean;
  list: IEvent[];
}
/** ******* ******* ******* ******* ******* ******* ******* */

/** *******  Events Slice actions interface definition ******* */
interface EventsActions {
  setEvents: (events: IEvent[]) => void;
  setLoadingEvents: (isLoading: boolean) => void;
}
/** ******* ******* ******* ******* ******* ******* ******* */

export interface EventsSlice {
  events: EventsContext;
  eventsActions: EventsActions;
}

export const createEventsSlice: StateCreator<
  EventsSlice,
  [],
  [],
  EventsSlice
> = (set) => ({
  events: { list: [], loadingEvents: false },
  eventsActions: {
    setEvents: (eventsList) =>
      set((state) => ({
        events: { ...state.events, list: eventsList },
      })),
    setLoadingEvents: (isLoading) =>
      set((state) => ({
        events: { ...state.events, loadingEvents: isLoading },
      })),
  },
});
