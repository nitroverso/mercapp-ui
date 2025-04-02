// hooks
import { useStore } from "@/app/lib/hooks/useStore";
import { useError } from "@/app/lib/hooks/useError";
// services
import {
  addEventService,
  deleteEventService,
  getAllEventsService,
  updateEventService,
} from "@/app/lib/services/serviceEvents";
// types
import { IEventRequest } from "@/app/lib/definitions/events";
import { ITopBarSearch } from "@/app/lib/definitions/ui";

// !DELETE THIS
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useEvents({ searchQuery }: ITopBarSearch = {}) {
  const {
    events: { list: events, loadingEvents },
    eventsActions: { setEvents, setLoadingEvents },
  } = useStore();

  const { processError } = useError();

  const loadEvents = async () => {
    try {
      setLoadingEvents(true);
      const events = await getAllEventsService();
      setEvents(events);
      setLoadingEvents(false);
    } catch (error) {
      setLoadingEvents(false);
      processError(error);
    }
  };

  const addEvent = async (body: IEventRequest) => {
    try {
      setLoadingEvents(true);
      const event = await addEventService(body);
      setEvents([...events, event]);
      setLoadingEvents(false);
      return event;
    } catch (error) {
      setLoadingEvents(false);
      processError(error);
    }
  };

  const editEvent = async (body: IEventRequest) => {
    try {
      setLoadingEvents(true);
      const event = await updateEventService(body);
      setEvents(events.map((item) => (item.id === body.id ? event : item)));
      setLoadingEvents(false);
      return event;
    } catch (error) {
      setLoadingEvents(false);
      processError(error);
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      setLoadingEvents(true);
      await deleteEventService({ eventId });
      const newList = [...events].filter(({ id }) => id !== eventId);
      setEvents(newList);
      setLoadingEvents(false);
    } catch (error) {
      setLoadingEvents(false);
      processError(error);
    }
  };

  return {
    addEvent,
    deleteEvent,
    editEvent,
    events,
    loadEvents,
    loadingEvents,
  };
}
