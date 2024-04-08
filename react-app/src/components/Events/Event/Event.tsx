import { SimplifiedEvent } from "../../../types/Event";
import { useNavigate } from "react-router-dom";
import "./Event.css";

const Event: React.FC<{ event: SimplifiedEvent; onDelete: () => void }> = ({
  event,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/editEvent/${event.eventId}`);
  };
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
          hour12: true,
        }).format(new Date(event.startDate))}
        <br />
        <b>End Date:</b>{" "}
        {new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date(event.endDate))}
        <br />
        <b>Organizer:</b> {event.organizer}
        <br />
      </div>
      <div className="eventActionBtns">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Event;
