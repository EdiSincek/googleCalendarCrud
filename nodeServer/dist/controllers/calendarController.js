export default function createCalendarController(calendarService) {
  return {
    getEvents: async (req, res) => {
      try {
        const events = await calendarService.getEvents();
        res.send(events);
      } catch (error) {
        res
          .status(500)
          .send({ error: "Error fetching events.", details: error.message });
      }
    },
    createEvent: async (req, res) => {
      try {
        const eventDetails = req.body;
        const response = await calendarService.createEvent(eventDetails);
        res.send(201);
      } catch (error) {
        console.log(error);
        res.status(500).send({
          error: "Error while creating event.",
          details: error.message,
        });
      }
    },
    deleteEvent: async (req, res) => {
      try {
        const { eventId } = req.params;
        await calendarService.deleteEvent(eventId);
        res.status(200).send({ message: "Event successfully deleted." });
      } catch (error) {
        res.status(500).send({
          error: "Error deleting event.",
          details: error.message,
        });
      }
    },
    updateEvent: async (req, res) => {
      try {
        const { eventId } = req.params;
        const eventDetails = req.body;
        const updatedEvent = await calendarService.updateEvent(
          eventId,
          eventDetails
        );
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
