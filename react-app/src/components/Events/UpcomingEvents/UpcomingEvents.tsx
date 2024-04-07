import { useState } from "react";
import { Event as EventType } from "../../../types/Event";
import Event from "../Event/Event";
import "./UpcomingEvents.css";

const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvets = () => {
    fetch("http://localhost:3001/google/getEvents")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <div className="UpcomingEvents">
        <button onClick={fetchEvets}>FETCH YOUR EVENTS</button>
      </div>
    );
  }

  return (
    <div className="UpcomingEvents">
      <button onClick={fetchEvets}>FETCH YOUR EVENTS</button>
      <h2>Upcoming Events</h2>
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
