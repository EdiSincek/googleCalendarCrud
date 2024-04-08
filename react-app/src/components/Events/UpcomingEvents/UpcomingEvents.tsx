import { useState, useEffect } from "react";
import { Event as EventType } from "../../../types/Event";
import Event from "../Event/Event";
import "./UpcomingEvents.css";

const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/google/calendar/getEvents")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setEvents(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const deleteEvent = async (eventId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3001/google/calendar/event/${eventId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Event deleted successfully");
        setEvents(events.filter((event) => event.eventId !== eventId));
      } else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  };

  return (
    <div className="UpcomingEvents">
      <h2 className="title">Your upcoming events</h2>
      {events.length === 0 ? (
        <p>No upcoming events found.</p>
      ) : (
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <Event
                event={event}
                onDelete={() => deleteEvent(event.eventId)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingEvents;
