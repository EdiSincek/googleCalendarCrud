import { useState } from "react";
import { SimplifiedEvent } from "../../../types/Event";
import useCalendar from "../../../hooks/useCalendar";
import "./CreateEvent.css";

const CreateEvent: React.FC = () => {
  const { createEvent } = useCalendar();
  const [formData, setFormData] = useState<SimplifiedEvent>({
    summary: "",
    location: "",
    startDate: "",
    endDate: "",
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
    try {
      const response = await createEvent(formData);

      if (response.status === 201) {
        setSuccessMessage("Event created successfully!");
        setFormData({
          summary: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        });
      } else {
        console.error("Failed to create event:", response.status);
        setSuccessMessage("Failed to create event, please try again.");
      }
    } catch (error) {
      console.error("Failed to create event:", error);
      setSuccessMessage("Failed to create event, please try again.");
    }
  };

  return (
    <div className="CreateEvent">
      <h2 className="title">{successMessage}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="summary">Summary:</label>
        <input
          id="summary"
          type="text"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          required
        />

        <label htmlFor="location">Location:</label>
        <input
          id="location"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label htmlFor="startDate">Start:</label>
        <input
          id="startDate"
          type="datetime-local"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="endDate">End:</label>
        <input
          id="endDate"
          type="datetime-local"
          name="endDate"
          value={formData.endDate}
          min={formData.startDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
