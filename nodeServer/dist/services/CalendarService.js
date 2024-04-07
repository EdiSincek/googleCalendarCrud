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
                summary: event.summary || "No Title",
                location: event.location || "No Location",
                startDate: event.start?.dateTime || event.start?.date || "No Start Date",
                organizer: event.organizer?.email || "No Organizer",
            }));
        }
        catch (error) {
            throw new Error(`Error fetching events: ${error}`);
        }
    }
}
export default CalendarService;
