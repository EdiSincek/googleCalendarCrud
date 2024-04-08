import { Request, Response } from "express";
import CalendarService from "../services/calendarService.js";

export default function createCalendarController(
  calendarService: CalendarService
) {
  return {
    getEvents: async (req: Request, res: Response) => {
      try {
        const events = await calendarService.getEvents();
        res.send(events);
      } catch (error) {
        res
          .status(500)
          .send({ error: "Error fetching events.", details: error.message });
      }
    },
  };
}