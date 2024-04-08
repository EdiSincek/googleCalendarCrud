import { google, calendar_v3 } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { SimplifiedEvent } from "../types/caledarTypes.js";

class CalendarService {
  calendar: calendar_v3.Calendar;

  constructor(oauthClient: OAuth2Client) {
    this.calendar = google.calendar({ version: "v3", auth: oauthClient });
  }

  async getEvents(
    maxResults: number = 20,
    calendarId: string = "primary"
  ): Promise<SimplifiedEvent[]> {
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

  async createEvent(
    eventDetails: SimplifiedEvent,
    calendarId: string = "primary"
  ): Promise<calendar_v3.Schema$Event> {
    try {
      const event: calendar_v3.Schema$Event = {
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

  async deleteEvent(eventId: string, calendarId: string = "primary") {
    try {
      await this.calendar.events.delete({
        calendarId: calendarId,
        eventId: eventId,
      });
    } catch (error) {
      throw new Error(`Error deleting event: ${error}`);
    }
  }

  async updateEvent(
    eventId: string,
    eventDetails: SimplifiedEvent,
    calendarId: string = "primary"
  ): Promise<calendar_v3.Schema$Event> {
    try {
      const updatedEvent: calendar_v3.Schema$Event = {
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
