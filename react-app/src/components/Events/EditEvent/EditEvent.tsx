import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SimplifiedEvent } from "../../../types/Event";
import "./EditEvent.css";

const EditEvent: React.FC = () => {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [formData, setFormData] = useState<SimplifiedEvent>({
    eventId: "",
    summary: "",
    location: "",
    startDate: "",
    endDate: "",
    organizer: "",
  });
  useEffect(() => {
    const allEvents = JSON.parse(localStorage.getItem("events") || "[]");
    const eventToEdit = allEvents.find(
      (e: SimplifiedEvent) => e.eventId === eventId
    );
    if (eventToEdit) {
      setFormData({
        ...eventToEdit,
        startDate: formatDate(eventToEdit.startDate),
        endDate: formatDate(eventToEdit.endDate),
      });
    }
  }, [eventId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3001/google/calendar/event/${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Event updated successfully");
        navigate("/events");
      } else {
        console.error("Failed to update event:", response.status);
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="EditEvent">
      <h2 className="title">Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="summary">Summary:</label>
          <input
            type="text"
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Start:</label>
          <input
            type="datetime-local"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End:</label>
          <input
            type="datetime-local"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            min={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default EditEvent;
