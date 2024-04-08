import { Event as EventInterface } from "../../../types/Event";
import "./Event.css";

const Event: React.FC<{ event: EventInterface; onDelete: () => void }> = ({
  event,
  onDelete,
}) => {
  return (
    <div className="Event">
      <h2>{event.summary}</h2>
      <div className="eventDetails">
        <b>Location:</b> {event.location}
        <br />
        <b>Start Date:</b>{" "}
        {new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Berlin",
          timeZoneName: "short",
        }).format(new Date(event.startDate))}
        <br />
        <b>Organizer:</b> {event.organizer}
        <br />
      </div>
      <div className="eventActionBtns">
        <button>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Event;
