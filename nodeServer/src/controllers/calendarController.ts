import { Request, Response } from "express";
import CalendarService from "../services/calendarService.js";
import { SimplifiedEvent } from "../types/caledarTypes.js";
import DatabaseService from "../services/databaseService.js";
import { ActionLog } from "../types/databaseTypes.js";

export default function createCalendarController(
  calendarService: CalendarService,
  databaseService: DatabaseService
) {
  return {
    getEvents: async (req: Request, res: Response) => {
      try {
        const events: SimplifiedEvent[] = await calendarService.getEvents();
        res.send(events);
      } catch (error) {
        res
          .status(500)
          .send({ error: "Error fetching events.", details: error.message });
      }
    },
    createEvent: async (req: Request, res: Response) => {
      try {
        const eventDetails = req.body;
        const response = await calendarService.createEvent(eventDetails);
        const log: ActionLog = {
          action_type: "CREATED",
          event_id: response.id,
        };
        await databaseService.addLog(log);
        res.send(201);
      } catch (error) {
        console.log(error);
        res.status(500).send({
          error: "Error while creating event.",
          details: error.message,
        });
      }
    },
    deleteEvent: async (req: Request, res: Response) => {
      try {
        const { eventId } = req.params;
        await calendarService.deleteEvent(eventId);
        const log: ActionLog = {
          action_type: "DELETED",
          event_id: eventId,
        };
        await databaseService.addLog(log);
        res.status(200).send({ message: "Event successfully deleted." });
      } catch (error) {
        res.status(500).send({
          error: "Error deleting event.",
          details: error.message,
        });
      }
    },
    updateEvent: async (req: Request, res: Response) => {
      try {
        const { eventId } = req.params;
        const eventDetails = req.body;
        const updatedEvent = await calendarService.updateEvent(
          eventId,
          eventDetails
        );
        const log: ActionLog = {
          action_type: "EDITED",
          event_id: eventId,
        };
        await databaseService.addLog(log);
        res.status(200).send({ message: "Event successfully updated." });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          error: "Error updating event.",
          details: error.message,
        });
      }
    },
  };
}
