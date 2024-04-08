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
        res.status(500).send({
          error: "Error while creating event.",
          details: error.message,
        });
      }
    },
  };
}
