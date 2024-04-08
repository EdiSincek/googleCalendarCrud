import { useState, useEffect } from "react";
import useCalendar from "../../../hooks/useCalendar";
import Event from "../Event/Event";
import "./UpcomingEvents.css";

const UpcomingEvents: React.FC = () => {
  const { events, fetchEvents, deleteEvent } = useCalendar();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await fetchEvents();
      setIsLoading(false);
    };
    loadData();
  }, [fetchEvents]);

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

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
                onDelete={() => deleteEvent(event.eventId!)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingEvents;
