import { google, calendar_v3 } from "googleapis";
import { OAuth2Client } from "google-auth-library";

interface SimplifiedEvent {
  summary: string;
  location: string;
  startDate: string;
  organizer: string;
}

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
        summary: event.summary || "No Title",
        location: event.location || "No Location",
        startDate:
          event.start?.dateTime || event.start?.date || "No Start Date",
        organizer: event.organizer?.email || "No Organizer",
      }));
    } catch (error) {
      throw new Error(`Error fetching events: ${error}`);
    }
  }
}

export default CalendarService;
