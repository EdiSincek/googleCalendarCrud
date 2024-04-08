export interface SimplifiedEvent {
  eventId: string;
  summary: string;
  location: string;
  startDate: string;
  organizer: string;
}

export interface NewEventDetails {
  summary: string;
  location: string;
  startTime: string;
  endTime: string;
  description?: string;
}
