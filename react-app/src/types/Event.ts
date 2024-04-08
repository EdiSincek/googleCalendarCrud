export interface Event {
  eventId: string;
  summary: string;
  location: string;
  startDate: string;
  organizer: string;
}

export interface EventFormData {
  summary: string;
  location: string;
  startTime: string;
  endTime: string;
  description: string;
}
