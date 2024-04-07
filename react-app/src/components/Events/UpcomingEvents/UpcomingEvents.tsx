import { useState, useEffect } from "react";
import { Event as EventType } from "../../../types/Event";
import Event from "../Event/Event";
import "./UpcomingEvents.css";

const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/google/getEvents")
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

  return (
    <div className="UpcomingEvents">
      <h2 className="title">Your upcoming events</h2>
      {events.length === 0 ? (
        <p>No upcoming events found.</p>
      ) : (
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <Event event={event} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingEvents;
