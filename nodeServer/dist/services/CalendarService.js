import { google } from "googleapis";
class CalendarService {
  calendar;
  constructor(oauthClient) {
    this.calendar = google.calendar({ version: "v3", auth: oauthClient });
  }
  async getEvents(maxResults = 20, calendarId = "primary") {
    try {
      const res = await this.calendar.events.list({
        calendarId: calendarId,
        timeMin: new Date().toISOString(),
        maxResults: maxResults,
        singleEvents: true,
        orderBy: "startTime",
      });
      return res.data.items.map((event) => ({
        eventId: event.id,
        summary: event.summary || "No Title",
        location: event.location || "No Location",
        startDate:
          event.start?.dateTime || event.start?.date || "No Start Date",
        endDate: event.end?.dateTime || event.end?.date || "No End Date",
        organizer: event.organizer?.email || "No Organizer",
        description: event.description || "No Description",
      }));
    } catch (error) {
      throw new Error(`Error fetching events: ${error}`);
    }
  }
  async createEvent(eventDetails, calendarId = "primary") {
    try {
      const event = {
        summary: eventDetails.summary,
        location: eventDetails.location,
        description: eventDetails.description,
        start: {
          dateTime: new Date(eventDetails.startDate).toISOString(),
          timeZone: "Europe/Berlin",
        },
        end: {
          dateTime: new Date(eventDetails.endDate).toISOString(),
          timeZone: "Europe/Berlin",
        },
      };
      const res = await this.calendar.events.insert({
        calendarId: calendarId,
        requestBody: event,
      });
      return res.data;
    } catch (error) {
      throw new Error(`Error creating event: ${error}`);
    }
  }
  async deleteEvent(eventId, calendarId = "primary") {
    try {
      await this.calendar.events.delete({
        calendarId: calendarId,
        eventId: eventId,
      });
    } catch (error) {
      throw new Error(`Error deleting event: ${error}`);
    }
  }
  async updateEvent(eventId, eventDetails, calendarId = "primary") {
    try {
      const updatedEvent = {
        summary: eventDetails.summary,
        location: eventDetails.location,
        start: {
          dateTime: new Date(eventDetails.startDate).toISOString(),
          timeZone: "Europe/Berlin",
        },
        end: {
          dateTime: new Date(eventDetails.endDate).toISOString(),
          timeZone: "Europe/Berlin",
        },
      };
      const res = await this.calendar.events.update({
        calendarId: calendarId,
        eventId: eventId,
        requestBody: updatedEvent,
      });
      return res.data;
    } catch (error) {
      throw new Error(`Error updating event: ${error}`);
    }
  }
}
export default CalendarService;
