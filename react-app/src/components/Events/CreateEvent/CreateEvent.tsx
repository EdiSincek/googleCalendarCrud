import { useState } from "react";
import { EventFormData } from "../../../types/Event";
import "./CreateEvent.css";

const CreateEvent: React.FC = () => {
  const [formData, setFormData] = useState<EventFormData>({
    summary: "",
    location: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const [successMessage, setSuccessMessage] =
    useState<string>("Create new event");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    try {
      const response = await fetch(
        "http://localhost:3001/google/calendar/createEvent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Event created successfully!");
        setFormData({
          summary: "",
          location: "",
          startTime: "",
          endTime: "",
          description: "",
        });
      } else {
        console.error("Failed to create event:", response.status);
        setSuccessMessage("Failed to create event, please try again.");
      }
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  return (
    <div className="CreateEvent">
      <h2 className="title">{successMessage}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="Event Summary"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <input
          type="datetime-local"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="endTime"
          value={formData.endTime}
          min={formData.startTime}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description (optional)"
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
