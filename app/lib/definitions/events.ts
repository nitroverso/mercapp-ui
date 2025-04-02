export type IEvent = {
  id: string;
  date: string;
  completed: boolean;
  precio_total: number;
  name: string;
  productIds: string[];
};

export const DATE_FORMAT = "YYYY-MM-DD";

//** ******* Products Requests ******* */
export type IEventRequest = Partial<IEvent>;

export type IDeleteEventRequest = {
  eventId: string;
};
